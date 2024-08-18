import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { Subject, takeUntil } from 'rxjs';
import { ApiService } from '../../api-service/api.service';
import { NotificationService } from '../../auth/notification.service';
import { User } from '../../model/model';
import { ConfirmModalComponent } from '../../modal-dialog/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-admin',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit, OnDestroy {
  managers: User[] = [];
  juniorDevelopers: User[] = [];
  userId!: number;
  userName = '';
  userRole = '';
  userEmail = '';

  showProfile: boolean = false;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private titleService: Title,
    public dialog: MatDialog,
    private apiService: ApiService,
    private notificationService: NotificationService
  ) {
    this.titleService.setTitle('TMS - Users');
  }

  ngOnInit(): void {
    this.fetchManagerData();
    this.fetchJuniorDeveloperData();
  }

  fetchManagerData() {
    this.apiService
      .getManagers()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (data: any) => {
          this.managers = data;
          console.log('Manager:', this.managers);
        },
        (error) => {
          console.error('Error fetching managers:', error);
        }
      );
  }

  fetchJuniorDeveloperData() {
    this.apiService
      .getJuniorDevelopers()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (data: any) => {
          this.juniorDevelopers = data;
          console.log('juniorDevelopers:', this.juniorDevelopers);
        },
        (error) => {
          console.error('Error fetching junior developers:', error);
        }
      );
  }

  selectedUser(user: any) {
    this.userId = user.id;
    console.log('User Id:', this.userId);
    this.userName = user.name;
    this.userRole = user.role;
    this.userEmail = user.email;
    this.showProfile = true;
  }

  openConfirmModal() {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: '350px',
      data: {
        message: `This action will delete the entire user's data, Confirm?`,
      },
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((result) => {
        if (result && result.confirmed) {
          this.deleteUser(this.userId);
        }
      });
  }
  deleteUser(userId: number) {
    this.apiService
      .deleteUser(userId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        () => {
          console.log('Task Deletion successful');
          this.notificationService.showNotification('User Deletion successful');
          this.fetchManagerData();
          this.fetchJuniorDeveloperData();
          this.userName = '';
          this.userRole = '';
          this.userEmail = '';
          this.showProfile = false;
        },
        (error) => {
          console.error('Deletion error:', error);
          this.notificationService.showNotification('User Deletion Failure');
        }
      );
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
