import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { ReportComponent } from './containers/report/report.component';
import { NgxDhis2VisualizationModule } from './modules/ngx-dhis2-visualization/ngx-dhis2-visualization.module';
import { SharedModule } from 'src/app/shared';

@NgModule({
  declarations: [ReportComponent],
  imports: [
    CommonModule,
    ReportRoutingModule,
    NgxDhis2VisualizationModule,
    SharedModule
  ]
})
export class ReportModule {}
