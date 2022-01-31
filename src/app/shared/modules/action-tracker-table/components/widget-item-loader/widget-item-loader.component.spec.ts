import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WidgetItemLoaderComponent } from './widget-item-loader.component';

describe('WidgetItemLoaderComponent', () => {
  let component: WidgetItemLoaderComponent;
  let fixture: ComponentFixture<WidgetItemLoaderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetItemLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetItemLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
