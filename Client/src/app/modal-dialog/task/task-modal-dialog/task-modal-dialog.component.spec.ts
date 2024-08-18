import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskModalDialogComponent } from './task-modal-dialog.component';

describe('TaskModalDialogComponent', () => {
  let component: TaskModalDialogComponent;
  let fixture: ComponentFixture<TaskModalDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskModalDialogComponent]
    });
    fixture = TestBed.createComponent(TaskModalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
