import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-components/material.module';
import { UsersComponent } from './admin/users/users.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { ManagerDashboardComponent } from './manager/manager-dashboard/manager-dashboard.component';
import { JrDevDashboardComponent } from './jr-developer/jr-dev-dashboard/jr-dev-dashboard.component';
import { ProfileComponent } from './common/user-profile/profile.component';
import { DashboardComponent } from './common/common-dashboard/dashboard.component';
import { TaskModalDialogComponent } from './modal-dialog/task/task-modal-dialog/task-modal-dialog.component';
import { TeamModalDialogComponent } from './modal-dialog/team/team-modal-dialog/team-modal-dialog.component';
import { DurationComponent } from './modal-dialog/duration/duration.component';
import { TaskEditModalComponent } from './modal-dialog/task/task-edit-modal/task-edit-modal.component';
import { DeleteDevModalComponent } from './modal-dialog/delete-dev-modal/delete-dev-modal.component';
import { ConfirmModalComponent } from './modal-dialog/confirm-modal/confirm-modal.component';
import { ProfileEditModalComponent } from './modal-dialog/profile-edit-modal/profile-edit-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    NavbarComponent,
    SignInComponent,
    SignUpComponent,
    AdminDashboardComponent,
    ManagerDashboardComponent,
    JrDevDashboardComponent,
    ProfileComponent,
    DashboardComponent,
    TaskModalDialogComponent,
    TeamModalDialogComponent,
    DurationComponent,
    TaskEditModalComponent,
    DeleteDevModalComponent,
    ConfirmModalComponent,
    ProfileEditModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
