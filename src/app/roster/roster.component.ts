import { Component, OnInit } from '@angular/core';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'app-roster',
  templateUrl: './roster.component.html'
})
export class RosterComponent implements OnInit {
  userStats: UserStatsDto[] = [];
  isLoading = false;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUserStats();
  }

  private loadUserStats() {
    this.isLoading = true;
    this.userService.getUserStats()
      .subscribe({
        next: (stats) => {
          this.userStats = stats;
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
        }
      });
  }
} 
console.log('This is a test change!');