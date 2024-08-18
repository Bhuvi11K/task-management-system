import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { Subject, takeUntil } from 'rxjs';
import { ApiService } from 'src/app/api-service/api.service';
import { AuthService } from 'src/app/auth/auth.service';
import { NotificationService } from 'src/app/auth/notification.service';
import { ConfirmModalComponent } from 'src/app/modal-dialog/confirm-modal/confirm-modal.component';
import { TaskEditModalComponent } from 'src/app/modal-dialog/task/task-edit-modal/task-edit-modal.component';
import { TaskModalDialogComponent } from 'src/app/modal-dialog/task/task-modal-dialog/task-modal-dialog.component';

@Component({
  selector: 'app-manager-dashboard',
  templateUrl: './manager-dashboard.component.html',
  styleUrls: ['./manager-dashboard.component.css'],
})
export class ManagerDashboardComponent implements OnInit, OnDestroy {
  userData: any = {};
  developers: any[] = [];
  assignedTasks: any[] = [];
  taskDuration: any[] = [];
  devSelected = false;
  developerId!: number;
  developerName = '';
  developer: any;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private titleService: Title,
    public dialog: MatDialog,
    private authService: AuthService,
    private apiService: ApiService,
    private notificationService: NotificationService
  ) {
    this.titleService.setTitle('TMS - Dashboard');
  }

  ngOnInit(): void {
    this.getUserData();
    this.fetchDevelopers();
  }

  selectedDeveloper(developer: any) {
    this.developerName = developer.name;
    this.developer = developer;
  }

  getUserData(): void {
    const userDataString = localStorage.getItem('userData');

    if (userDataString !== null) {
      this.userData = JSON.parse(userDataString);
    } else {
      this.userData = {};
    }
  }

  fetchDevelopers(): void {
    const managerId = this.userData.id;
    // console.log('Manager ID:', managerId);

    this.apiService
      .getDevelopersForManager(managerId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (data: any) => {
          // console.log('Response data:', data);
          this.developers = data;
          // console.log('Developers mapped to the manager:', this.developers);
        },
        (error) => {
          console.error('Error fetching developers for the manager:', error);
        }
      );
  }

  getAssignedTasks(developerId: number): void {
    this.devSelected = true;
    this.developerId = developerId;

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
    this.getTaskDuration();
  }

  openTaskDialog() {
    const dialogRefTask = this.dialog.open(TaskModalDialogComponent, {
      width: '300px',
      data: {
        developers: this.developers,
      },
    });
    dialogRefTask
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((taskForm) => {
        if (taskForm) {
          const developerId = taskForm.developer;
          const selectedDeveloper = this.developers.find(
            (developers) => developers.id === developerId
          );
          const developerName = selectedDeveloper ? selectedDeveloper.name : '';
          this.developerName = developerName;
          const task = taskForm.task;
          const managerId = this.userData.id;
          console.log(
            'developerName',
            developerName,
            'developerId:',
            developerId,
            'task:',
            task,
            'managerId:',
            managerId
          );
          this.addTask(developerId, task, managerId);
        }
      });
  }

  addTask(developerId: number, task: string, managerId: number) {
    this.apiService
      .createTask(developerId, task, managerId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (data: any) => {
          console.log('Task created successfully:', data);
          this.notificationService.showNotification(
            'Task created successfully'
          );
          this.getAssignedTasks(developerId);
          this.getTaskDuration();
        },
        (error) => {
          console.error('Error creating task:', error);
          this.notificationService.showNotification(
            'Error creating task, Try again !'
          );
        }
      );
  }

  openEditDialog(task: any) {
    const dialogRefTask = this.dialog.open(TaskEditModalComponent, {
      width: '300px',
      data: { task },
    });
    dialogRefTask
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((updatedTask: any) => {
        if (updatedTask) {
          const { developerId, taskId, task } = updatedTask;
          console.log(
            'taskId:',
            taskId,
            'developerId:',
            developerId,
            'task:',
            task
          );
          this.updateTask(taskId, developerId, task);
        }
      });
  }

  updateTask(taskId: number, developerId: number, task: string) {
    this.apiService
      .updateTask(taskId, developerId, task)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (data: any) => {
          console.log('Task Updated Successfully', data);
          this.notificationService.showNotification(
            'Task Updated Successfully!'
          );
          this.getAssignedTasks(developerId);
        },
        (error) => {
          console.log('Task Updation Failure!', error);
          this.notificationService.showNotification('Task Updation Failure!');
        }
      );
  }

  getTaskDuration() {
    const developerId = this.developerId;

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

  openDeleteDialog(task: any) {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: '300px',
      data: { message: 'Are you sure to delete this Task?' },
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((result) => {
        if (result && result.confirmed) {
          // const taskId = result.taskId;
          const taskId = task.id;
          this.deleteTask(taskId);
        }
      });
  }
  deleteTask(taskId: number) {
    this.apiService
      .deleteTask(taskId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        () => {
          console.log('Task Deletion successful');
          this.notificationService.showNotification('Task Deletion successful');
          this.getAssignedTasks(this.developerId);
          this.getTaskDuration();
        },
        (error) => {
          console.error('Deletion error:', error);
          this.notificationService.showNotification('Task Deletion Failure');
        }
      );
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
