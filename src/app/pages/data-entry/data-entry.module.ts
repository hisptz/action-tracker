import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared';

import { DataEntryComponent } from './containers/data-entry/data-entry.component';
import { ActionTableComponent } from './containers/action-table/action-table.component';
import { DataEntryRoutingModule } from './data-entry-routing.module';
import { ProgressVisualizationDialogComponent } from './components/progress-visualization-dialog/progress-visualization-dialog.component';
import { NgxDhis2VisualizationModule } from '../analysis/modules/ngx-dhis2-visualization/ngx-dhis2-visualization.module';
import { DisableControlDirective } from './directives/disable-control.directive';
@NgModule({
  declarations: [
    DataEntryComponent,
    ActionTableComponent,
    ProgressVisualizationDialogComponent,
    DisableControlDirective,
  ],
  imports: [
    CommonModule,
    DataEntryRoutingModule,
    SharedModule,
    NgxDhis2VisualizationModule,
  ],
  exports: [DataEntryComponent, ActionTableComponent],
  entryComponents: [ProgressVisualizationDialogComponent],
})
export class DataEntryModule {}
