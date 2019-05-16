import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetContextMenuComponent } from './widget-context-menu.component';

describe('WidgetContextMenuComponent', () => {
  let component: WidgetContextMenuComponent;
  let fixture: ComponentFixture<WidgetContextMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetContextMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetContextMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
