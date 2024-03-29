import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VisualizationWidgetComponent } from './visualization-widget.component';
import { SafePipe } from '../../pipes/safe';

describe('VisualizationWidgetComponent', () => {
  let component: VisualizationWidgetComponent;
  let fixture: ComponentFixture<VisualizationWidgetComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [VisualizationWidgetComponent, SafePipe]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizationWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
