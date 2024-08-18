import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-profile-edit-modal',
  templateUrl: './profile-edit-modal.component.html',
  styleUrls: ['./profile-edit-modal.component.css'],
})
export class ProfileEditModalComponent implements OnInit {
  profileEditForm!: FormGroup;
  userId: number;

  name: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private titleService: Title,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ProfileEditModalComponent>
  ) {
    this.titleService.setTitle('TMS - Profile');
    this.userId = this.data.userId;
    this.name = this.data.userName;
    console.log('UserId:', this.userId, 'UserName:', this.name);
  }

  ngOnInit(): void {
    this.profileEditForm = this.fb.group({
      name: [this.name, Validators.required],
    });
  }

  onUpdate() {
    if (this.profileEditForm.valid) {
      const updatedUserData: any = {
        userId: this.userId,
        userName: this.profileEditForm.value.name,
      };
      this.dialogRef.close(updatedUserData);
    }
  }
}
