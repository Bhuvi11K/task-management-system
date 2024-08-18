import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/model/model';

@Component({
  selector: 'app-team-modal-dialog',
  templateUrl: './team-modal-dialog.component.html',
  styleUrls: ['./team-modal-dialog.component.css'],
})
export class TeamModalDialogComponent {
  teamForm: FormGroup;

  managers: User[] = [];
  unmappedDevelopers: User[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<TeamModalDialogComponent>
  ) {
    this.managers = this.data.managers;
    this.unmappedDevelopers = this.data.unmappedDevelopers;
    this.teamForm = this.formBuilder.group({
      manager: ['', Validators.required],
      developer: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  addTeam() {
    if (this.teamForm.valid) {
      const managerId = this.teamForm.value.manager;
      const selectedManager = this.managers.find(
        (manager) => manager.id === managerId
      );
      const managerName = selectedManager ? selectedManager.name : '';

      const developerId = this.teamForm.value.developer;
      this.dialogRef.close({ managerId, managerName, developerId });
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
