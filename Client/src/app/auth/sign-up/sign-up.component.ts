import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NotificationService } from '../notification.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnDestroy {
  signupForm!: FormGroup;
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
    this.titleService.setTitle('TMS - Signup');
  }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      role: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const userData = this.signupForm.value;
      this.isLoading = true;

      this.authService
        .signUp(userData)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          (response) => {
            this.signupForm.reset();
            console.log('User registered successfully', response);
            this.isLoading = false;
            this.notificationService.showNotification(
              'User registered successfully'
            );
            this.router.navigate(['/signin']);
          },
          (error) => {
            this.signupForm.reset();
            console.error('Error registering user', error);
            this.isLoading = false;
            this.notificationService.showNotification(error);
          }
        );
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
