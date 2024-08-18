import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from 'src/app/auth/notification.service';
import { ProfileEditModalComponent } from 'src/app/modal-dialog/profile-edit-modal/profile-edit-modal.component';
import { ApiService } from 'src/app/api-service/api.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  userData: any = {};

  private unsubscribe$ = new Subject<void>();

  constructor(
    private titleService: Title,
    private apiService: ApiService,
    private notificationService: NotificationService,
    public dialog: MatDialog
  ) {
    this.titleService.setTitle('TMS - Profile');
  }

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData(): void {
    const userDataString = localStorage.getItem('userData');

    if (userDataString !== null) {
      this.userData = JSON.parse(userDataString);
    } else {
      this.userData = {};
    }
  }

  openProfileEditDialog() {
    const dialogRef = this.dialog.open(ProfileEditModalComponent, {
      width: '300px',
      data: { userId: this.userData.id, userName: this.userData.name },
    });
    dialogRef.afterClosed().subscribe((updatedProfileData: any) => {
      if (updatedProfileData) {
        const { userId, userName } = updatedProfileData;
        this.updateProfile(userId, userName);
      }
    });
  }

  updateProfile(id: number, name: string) {
    this.apiService
      .updateProfile(id, name)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (data: any) => {
          console.log(
            'Profile Updated Successfully',
            'updatedProfileData:',
            data
          );

          // Update the local storage with the new user data
          const userDataString = localStorage.getItem('userData');
          if (userDataString !== null) {
            const oldUserData = JSON.parse(userDataString);

            // Ensure that 'data.user.name' is defined before updating
            if (data.user && data.user.name) {
              const newUserData = { ...oldUserData, name: data.user.name };
              localStorage.setItem('userData', JSON.stringify(newUserData));

              // Update the component's userData property to reflect changes in the UI
              this.userData = newUserData;

              // Additional log for debugging
              console.log('New User Data:', newUserData);
            }
          }

          this.notificationService.showNotification(
            'Profile Updated Successfully!'
          );
        },
        (error) => {
          console.log('Profile Updation Failure!', error);
          this.notificationService.showNotification(
            'Profile Updation Failure!'
          );
        }
      );
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
