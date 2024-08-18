import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Task-Management-System';
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.checkToken();
    this.authService.checkSession();
  }

  checkToken(): void {
    const token = localStorage.getItem('authToken');

    if (token) {
      this.router.navigate(['/dashboard']);

      console.log('Token exists:', token);
    } else {
      this.router.navigate(['/signin']);

      console.log('Token does not exist');
    }
  }
}
