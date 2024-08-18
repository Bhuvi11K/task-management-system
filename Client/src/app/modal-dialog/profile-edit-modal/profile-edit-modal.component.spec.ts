import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileEditModalComponent } from './profile-edit-modal.component';

describe('ProfileEditModalComponent', () => {
  let component: ProfileEditModalComponent;
  let fixture: ComponentFixture<ProfileEditModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileEditModalComponent]
    });
    fixture = TestBed.createComponent(ProfileEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
