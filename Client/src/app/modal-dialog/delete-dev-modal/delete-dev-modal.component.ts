import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/model/model';

@Component({
  selector: 'app-delete-dev-modal',
  templateUrl: './delete-dev-modal.component.html',
  styleUrls: ['./delete-dev-modal.component.css'],
})
export class DeleteDevModalComponent {
  delDevForm: FormGroup;
  developers: User[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DeleteDevModalComponent>
  ) {
    this.developers = this.data.developers;

    this.delDevForm = this.fb.group({
      developer: ['', Validators.required],
    });
  }

  deleteDev() {
    if (this.delDevForm.valid) {
      const developerId = this.delDevForm.value.developer;
      this.dialogRef.close({ developerId });
    }
  }
}
