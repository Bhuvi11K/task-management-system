import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { ApiService } from 'src/app/api-service/api.service';
import { NotificationService } from 'src/app/auth/notification.service';
import { DeleteDevModalComponent } from 'src/app/modal-dialog/delete-dev-modal/delete-dev-modal.component';
import { TeamModalDialogComponent } from 'src/app/modal-dialog/team/team-modal-dialog/team-modal-dialog.component';
import { User } from 'src/app/model/model';
import { Title } from '@angular/platform-browser';
import { ConfirmModalComponent } from 'src/app/modal-dialog/confirm-modal/confirm-modal.component';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit, OnDestroy {

  displayedColumns = ['position', 'name','role', 'email', 'action'];

  managers: User[] = [];
  juniorDevelopers: User[] = [];
  teams: any[] = [];
  developers: any[] = [];
  assignedTasks: any[] = [];
  managerName = '';
  managerId!: number;
  selectedManagerId: number | null = null;
  unmappedDevelopers: User[] = [];
  displayTask = false;
  jrDevName = '';

  private unsubscribe$ = new Subject<void>();

  constructor(
    private titleService: Title,
    public dialog: MatDialog,
    private apiService: ApiService,
    private notificationService: NotificationService
  ) {
    this.titleService.setTitle('TMS - Admin Dashboard');
  }

  ngOnInit(): void {
    this.fetchManagerData();
    this.fetchJuniorDeveloperData();
    this.fetchunmappedDevelopers();
  }

  fetchunmappedDevelopers() {
    this.apiService
      .getUnmappedDevelopers()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (data: any) => {
          this.unmappedDevelopers = data;
          console.log('unmappedDevelopers:', this.unmappedDevelopers);
        },
        (error) => {
          console.error('Error fetching managers:', error);
        }
      );
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

  getTeam(managerId: number) {
    this.apiService
      .getDevelopersForManager(managerId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (data: any) => {
          console.log('Response data:', data);
          this.developers = data;
          console.log('Developers mapped to the manager:', this.developers);
        },
        (error) => {
          console.error('Error fetching developers for the manager:', error);
        }
      );
  }

  getAssignedTasks(developerId: number, jrDevName: string): void {
    this.jrDevName = jrDevName;
    this.displayTask = true;
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

  selectedManager(manager: any) {
    this.managerName = manager.name;
    this.managerId = manager.id;
    this.displayTask = false;
    this.jrDevName = '';
  }

  isDeveloperMappedToManager(developer: User): boolean {
    return this.developers.some((jrDev) => jrDev.id === developer.id);
  }

  openTeamDialog() {
    const dialogRefTeam = this.dialog.open(TeamModalDialogComponent, {
      width: '300px',
      data: {
        managers: this.managers,
        unmappedDevelopers: this.unmappedDevelopers,
      },
    });

    dialogRefTeam
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((teamFormData) => {
        if (teamFormData) {
          const managerId = teamFormData.managerId;
          const managerName = teamFormData.managerName;
          this.managerName = managerName;
          const developerId = teamFormData.developerId;
          // console.log(
          //   'managerId:',
          //   managerId,
          //   managerId,
          //   'managerName',
          //   managerName,
          //   'developerId:',
          //   developerId
          // );
          this.addTeam(managerId, developerId);
        }
      });
  }

  addTeam(managerId: number, developerId: number) {
    this.apiService
      .createTeam(managerId, developerId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (response) => {
          console.log('Team created:', response);
          this.notificationService.showNotification(
            'Developer mapped successfully'
          );

          this.fetchunmappedDevelopers();
          this.fetchJuniorDeveloperData();
          this.getTeam(managerId);
        },
        (error) => {
          console.error('Error creating team:', error);
          this.notificationService.showNotification(
            'Error occurred, Try again!'
          );
        }
      );
  }

  openDeleteTeamDialog() {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: '300px',
      data: { message: 'Are you sure to delete this Team?' },
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((result) => {
        if (result && result.confirmed) {
          const managerId = this.managerId;
          const developerIds = this.developers.map((developer) => developer.id);
          console.log('managerId:', managerId, 'developerIds:', developerIds);

          this.deleteTeam(managerId, developerIds);
        }
      });
  }

  deleteTeam(managerId: number, developerIds: number[]) {
    this.apiService.deleteTeam(managerId, developerIds).subscribe(
      () => {
        console.log('Team Deletion successful');
        this.developers = [];
        this.notificationService.showNotification('Team Deletion successful');
        this.fetchunmappedDevelopers();
      },
      (error) => {
        console.error('Deletion error:', error);
        this.notificationService.showNotification('Team Deletion Failure');
      }
    );
  }

  openDeleteDevDialog(devId: number) {
    const developerId = devId;
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: '300px',
      data: {
        message: 'Are you sure you want to delete this developer?',
      },
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((result) => {
        if (result && result.confirmed) {
          console.log('deletionDevId:', developerId);
          this.deleteDeveloper(developerId);
        }
      });
  }

  deleteDeveloper(developerId: number) {
    this.apiService
      .deleteDeveloperFromTeam(developerId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (response) => {
          console.log('Developer deleted from the Team', response);
          this.notificationService.showNotification(
            'Developer deleted successfully!'
          );
          this.fetchunmappedDevelopers();
          this.fetchJuniorDeveloperData();
          this.getTeam(this.managerId);
        },
        (error) => {
          console.log('Error deleting the developer from the team', error);
          this.notificationService.showNotification(
            'Error deleting the developer!'
          );
        }
      );
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
