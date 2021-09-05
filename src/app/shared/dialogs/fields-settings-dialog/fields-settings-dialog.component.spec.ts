import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FieldsSettingsDialogComponent } from './fields-settings-dialog.component';

describe('FieldsSettingsDialogComponent', () => {
  let component: FieldsSettingsDialogComponent;
  let fixture: ComponentFixture<FieldsSettingsDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldsSettingsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldsSettingsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
