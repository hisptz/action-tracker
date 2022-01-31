import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NotificationSnackbarComponent } from './notification-snackbar.component';

describe('NotificationSnackbarComponent', () => {
  let component: NotificationSnackbarComponent;
  let fixture: ComponentFixture<NotificationSnackbarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationSnackbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
