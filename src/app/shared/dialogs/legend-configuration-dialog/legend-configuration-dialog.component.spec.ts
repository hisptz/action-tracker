import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LegendConfigurationDialogComponent } from './legend-configuration-dialog.component';

describe('LegendConfigurationDialogComponent', () => {
  let component: LegendConfigurationDialogComponent;
  let fixture: ComponentFixture<LegendConfigurationDialogComponent>;

  beforeEach(async(() => {
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
