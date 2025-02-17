import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Article } from '../article/article.entity';
import { UserStatsDto } from './user-stats.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>
  ) {}

  async getUserStats(): Promise<UserStatsDto[]> {
    return this.userRepository
      .createQueryBuilder('user')
      .leftJoin('user.articles', 'article')
      .select([
        'user.username',
        'user.image',
        'user.bio',
        'COUNT(DISTINCT article.id) as "totalArticles"',
        'COALESCE(SUM(article.favoritesCount), 0) as "totalFavorites"',
        'MIN(article.createdAt) as "firstArticleDate"'
      ])
      .groupBy('user.id')
      .orderBy('"totalFavorites"', 'DESC')
      .getRawMany();
  }
} 