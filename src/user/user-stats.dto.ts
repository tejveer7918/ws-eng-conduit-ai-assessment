export interface UserStatsDto {
  username: string;
  image: string;
  bio: string;
  totalArticles: number;
  totalFavorites: number;
  firstArticleDate: Date | null;
} 