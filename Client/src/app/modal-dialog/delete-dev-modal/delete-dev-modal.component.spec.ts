import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDevModalComponent } from './delete-dev-modal.component';

describe('DeleteDevModalComponent', () => {
  let component: DeleteDevModalComponent;
  let fixture: ComponentFixture<DeleteDevModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteDevModalComponent]
    });
    fixture = TestBed.createComponent(DeleteDevModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
