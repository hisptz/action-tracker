import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatePickerComponentComponent } from './date-picker-component.component';

describe('DatePickerComponentComponent', () => {
  let component: DatePickerComponentComponent;
  let fixture: ComponentFixture<DatePickerComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatePickerComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatePickerComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
