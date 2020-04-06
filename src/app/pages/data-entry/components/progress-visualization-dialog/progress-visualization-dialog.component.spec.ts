import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressVisualizationDialogComponent } from './progress-visualization-dialog.component';

describe('ProgressVisualizationDialogComponent', () => {
  let component: ProgressVisualizationDialogComponent;
  let fixture: ComponentFixture<ProgressVisualizationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressVisualizationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressVisualizationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
