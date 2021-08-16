import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ActionTableComponent } from './action-table.component';

describe('ActionTableComponent', () => {
  let component: ActionTableComponent;
  let fixture: ComponentFixture<ActionTableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
