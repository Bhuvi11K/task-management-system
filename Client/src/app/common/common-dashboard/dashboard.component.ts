import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  userRole: string = '';

  constructor(private authService: AuthService, private router: Router) {
    this.fetchUserRole();
    this.checkAuthentication();
  }

  fetchUserRole(): void {
    const userDataString = localStorage.getItem('userData');

    if (userDataString !== null) {
      const userData = JSON.parse(userDataString);
      if (userData && userData.role) {
        this.userRole = userData.role;
      } else {
        this.userRole = '';
      }
    } else {
      this.userRole = '';
    }
  }

  checkAuthentication(): void {
    if (!this.authService.isLoggedIn) {
      this.router.navigate(['/signin']);
    }
  }
}
