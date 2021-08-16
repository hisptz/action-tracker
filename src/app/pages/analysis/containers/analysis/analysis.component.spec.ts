import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AnalysisComponent } from './analysis.component';
import { NgxDhis2VisualizationModule } from '../../modules/ngx-dhis2-visualization/ngx-dhis2-visualization.module';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from 'src/app/core/store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { effects } from 'src/app/core/store/effects';
import { RouterTestingModule } from '@angular/router/testing';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';

describe('ReportComponent', () => {
  let component: AnalysisComponent;
  let fixture: ComponentFixture<AnalysisComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NgxDhis2VisualizationModule,
        MatCardModule,
        MatProgressBarModule,
        StoreModule.forRoot(reducers, { metaReducers }),
        EffectsModule.forRoot(effects)
      ],
      declarations: [AnalysisComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
