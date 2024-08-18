import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { ApiService } from 'src/app/api-service/api.service';
import { NotificationService } from 'src/app/auth/notification.service';
import { DurationComponent } from 'src/app/modal-dialog/duration/duration.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-jr-dev-dashboard',
  templateUrl: './jr-dev-dashboard.component.html',
  styleUrls: ['./jr-dev-dashboard.component.css'],
})
export class JrDevDashboardComponent implements OnInit, OnDestroy {
  userData: any = {};
  assignedTasks: any[] = [];
  taskDuration: any[] = [];
  duration = '';
  private unsubscribe$ = new Subject<void>();

  constructor(
    private titleService: Title,
    private apiService: ApiService,
    public dialog: MatDialog,
    private notificationService: NotificationService
  ) {
    this.titleService.setTitle('TMS - Developer Dashboard');
  }

  ngOnInit(): void {
    this.getUserData();
    this.getAssignedTasks();
    this.getTaskDuration();
  }

  getUserData(): void {
    const userDataString = localStorage.getItem('userData');

    if (userDataString !== null) {
      this.userData = JSON.parse(userDataString);
    } else {
      this.userData = {};
    }
  }

  getAssignedTasks(): void {
    const developerId = this.userData.id;

    this.apiService
      .getAssignedTasks(developerId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (data: any) => {
          this.assignedTasks = data;
          console.log('Assigned tasks:', this.assignedTasks);
        },
        (error) => {
          console.error('Error fetching assigned tasks:', error);
        }
      );
  }

  openDurationModal(task_id: number) {
    const dialogRef = this.dialog.open(DurationComponent);
    const taskId = task_id;

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((result) => {
        if (result && result.duration) {
          const developerId = this.userData.id;
          this.duration = result.duration;
          console.log(
            'developer_id:',
            developerId,
            'task_id:',
            taskId,
            'duration data:',
            this.duration
          );

          this.apiService
            .insertTaskDuration(developerId, taskId, this.duration)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(
              (data: any) => {
                console.log('duration added successfully:', data);
                this.notificationService.showNotification(
                  'Duration added successfully'
                );
                this.getTaskDuration();
              },
              (error) => {
                console.error('Error adding duration', error);
                this.notificationService.showNotification(
                  'Error adding duration'
                );
              }
            );
        }
      });
  }

  getTaskDuration() {
    const developerId = this.userData.id;

    this.apiService
      .getTaskDuration(developerId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (data: any) => {
          this.taskDuration = data;
          console.log('Task duration:', this.taskDuration);
        },
        (error) => {
          console.error('Error fetching task duration:', error);
        }
      );
  }

  hasDuration(taskId: number): boolean {
    return this.taskDuration.some((item) => item.task_id === taskId);
  }

  getDuration(taskId: number): string {
    const durationItem = this.taskDuration.find(
      (item) => item.task_id === taskId
    );
    return durationItem ? durationItem.duration : '';
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
