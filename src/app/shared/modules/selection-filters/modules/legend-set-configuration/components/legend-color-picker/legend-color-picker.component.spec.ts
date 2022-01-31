/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LegendColorPickerComponent } from './legend-color-picker.component';
import { ColorPickerModule } from 'ngx-color-picker';

describe('LegendColorPickerComponent', () => {
  let component: LegendColorPickerComponent;
  let fixture: ComponentFixture<LegendColorPickerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ColorPickerModule],
      declarations: [LegendColorPickerComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LegendColorPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
