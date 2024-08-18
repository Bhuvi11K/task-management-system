import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamModalDialogComponent } from './team-modal-dialog.component';

describe('TeamModalDialogComponent', () => {
  let component: TeamModalDialogComponent;
  let fixture: ComponentFixture<TeamModalDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeamModalDialogComponent]
    });
    fixture = TestBed.createComponent(TeamModalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
