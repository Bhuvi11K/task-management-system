import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-task-edit-modal',
  templateUrl: './task-edit-modal.component.html',
  styleUrls: ['./task-edit-modal.component.css'],
})
export class TaskEditModalComponent implements OnInit {
  taskEditForm!: FormGroup;
  developerId: number;
  taskId: number;
  task: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<TaskEditModalComponent>
  ) {
    this.developerId = this.data.task.developer_id;
    this.taskId = this.data.task.id;
    this.task = this.data.task;
    console.log('developerId:', this.developerId, 'task:', this.task);
  }

  ngOnInit(): void {
    this.taskEditForm = this.formBuilder.group({
      task: [this.task.task, Validators.required],
    });
  }

  updateTask() {
    if (this.taskEditForm.valid) {
      const updatedTaskData: any = {
        developerId: this.developerId,
        taskId: this.taskId,
        task: this.taskEditForm.value.task,
      };
      this.dialogRef.close(updatedTaskData);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
