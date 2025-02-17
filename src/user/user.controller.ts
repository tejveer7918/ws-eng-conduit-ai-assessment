import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { UserStatsDto } from './user-stats.dto';

@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('stats')
  async getUserStats(): Promise<UserStatsDto[]> {
    return await this.userService.getUserStats();
  }
} 
