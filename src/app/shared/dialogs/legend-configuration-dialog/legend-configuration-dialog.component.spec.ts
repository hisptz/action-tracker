import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LegendConfigurationDialogComponent } from './legend-configuration-dialog.component';

describe('LegendConfigurationDialogComponent', () => {
  let component: LegendConfigurationDialogComponent;
  let fixture: ComponentFixture<LegendConfigurationDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LegendConfigurationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LegendConfigurationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
