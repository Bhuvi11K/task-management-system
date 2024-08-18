import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../auth/auth.service';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { ConfirmModalComponent } from '../modal-dialog/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  private unsubscribe$ = new Subject<void>();
  showUser: boolean = false;
  // userRole = '';

  constructor(
    public dialog: MatDialog,
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
  //   this.authService.userRole.subscribe((role) => {
  //     this.userRole = role;
  //     console.log('User Role - Navbar :', this.userRole);
  //   });

    this.fetchUserRole();
  }

  fetchUserRole(): void {
    const userDataString = localStorage.getItem('userData');

    if (userDataString !== null) {
      const userData = JSON.parse(userDataString);
      if (userData && userData.role) {
        const userRole = userData.role;
        this.showUser = userRole === 'Admin';
      } else {
        this.showUser = false;
      }
    } else {
      this.showUser = false;
    }
  }

  openLogoutDialog() {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: '300px',
      data: { message: 'Are you sure to Logout?' },
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((result) => {
        if (result && result.confirmed) {
          this.authService.logout();
          this.router.navigate(['/signin']);
          this.showUser = false;
        }
      });
  }
}
