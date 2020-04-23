import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { ReportComponent } from './containers/report/report.component';
import { SharedModule } from 'src/app/shared';

@NgModule({
  declarations: [ReportComponent],
  imports: [CommonModule, ReportRoutingModule, SharedModule]
})
export class ReportModule {}
