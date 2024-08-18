import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/api-service/api.service';
import { NotificationService } from 'src/app/auth/notification.service';

@Component({
  selector: 'app-duration',
  templateUrl: './duration.component.html',
  styleUrls: ['./duration.component.css'],
})
export class DurationComponent implements OnInit {
  durationForm!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<DurationComponent>,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.durationForm = this.formBuilder.group({
      duration: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.durationForm.valid) {
      this.dialogRef.close(this.durationForm.value);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
