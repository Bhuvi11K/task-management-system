import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-task-modal-dialog',
  templateUrl: './task-modal-dialog.component.html',
  styleUrls: ['./task-modal-dialog.component.css'],
})
export class TaskModalDialogComponent implements OnInit {
  taskForm!: FormGroup;
  developers: any[] = [];
  assignedTasks: any[] = [];
  isLoading = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<TaskModalDialogComponent>,
    
  ) {
    this.developers = this.data.developers;
  }

  ngOnInit(): void {
    this.taskForm = this.formBuilder.group({
      developer: [null, Validators.required],
      task: [null, Validators.required],
    });
  }

  addTask(){
    if (this.taskForm.valid){   
      console.log('TaskForm:', this.taskForm.value)
      this.dialogRef.close(this.taskForm.value);
    }
  }


  onCancel() {
    this.dialogRef.close();
  }

}
