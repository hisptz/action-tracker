import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalysisRoutingModule } from './analysis-routing.module';
import { AnalysisComponent } from './containers/analysis/analysis.component';
import { NgxDhis2VisualizationModule } from './modules/ngx-dhis2-visualization/ngx-dhis2-visualization.module';
import { SharedModule } from 'src/app/shared';

@NgModule({
  declarations: [AnalysisComponent],
  imports: [
    CommonModule,
    AnalysisRoutingModule,
    NgxDhis2VisualizationModule,
    SharedModule
  ]
})
export class AnalysisModule {}
