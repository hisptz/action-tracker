import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetNotificationBarComponent } from './widget-notification-bar.component';

describe('WidgetNotificationBarComponent', () => {
  let component: WidgetNotificationBarComponent;
  let fixture: ComponentFixture<WidgetNotificationBarComponent>;

  beforeEach(async(() => {
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
