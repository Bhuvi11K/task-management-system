import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { NotificationService } from '../notification.service';
import { Subject, takeUntil } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnDestroy {
  loginForm!: FormGroup;
  isLoading = false;
  hide = true;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private titleService: Title,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router
  ) {
    this.titleService.setTitle('TMS - Signin');
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSignin() {
    if (this.loginForm && this.loginForm.valid) {
      this.isLoading = true;
      const loginData = this.loginForm.value;
      this.onUserSignin(loginData);
    }
  }

  onUserSignin(signinData: any) {
    this.authService
      .login(signinData)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (response) => {
          console.log('User logged in successfully', response);
          if (response && response.token && response.user) {
            console.log('Received Token:', response.token);
            console.log('User Data:', response.user);
            this.router.navigate(['/dashboard']);
          }
          this.loginForm.reset();
          this.isLoading = false;
        },
        (error) => {
          console.error('Error during login', error);
          this.isLoading = false;
          this.notificationService.showNotification(error);
        }
      );
  }

  onLogout() {
    // Call logout method from AuthService on logout action
    this.authService.logout();
    // Check if the token was removed from localStorage
    const tokenAfterLogout = localStorage.getItem('authToken');
    console.log('Token After Logout:', tokenAfterLogout); // Should log null or undefined
    // Perform any additional logout actions if needed
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
