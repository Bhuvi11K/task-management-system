import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JrDevDashboardComponent } from './jr-dev-dashboard.component';


describe('JrDevDashboardComponent', () => {
  let component: JrDevDashboardComponent;
  let fixture: ComponentFixture<JrDevDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JrDevDashboardComponent]
    });
    fixture = TestBed.createComponent(JrDevDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
