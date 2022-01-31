import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WidgetNotificationBarComponent } from './widget-notification-bar.component';

describe('WidgetNotificationBarComponent', () => {
  let component: WidgetNotificationBarComponent;
  let fixture: ComponentFixture<WidgetNotificationBarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetNotificationBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetNotificationBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
