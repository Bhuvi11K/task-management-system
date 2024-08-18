import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})

export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn) {
      return true; // User is logged in, allow access to the route
    } else {
      this.router.navigate(['/signin']); // Redirect to the signin page if not logged in
      return false; 
    }
  }
}
