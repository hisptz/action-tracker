import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared';

import { DataEntryComponent } from './containers/data-entry/data-entry.component';
import { ActionTableComponent } from './containers/action-table/action-table.component';
import { DataEntryRoutingModule } from './data-entry-routing.module';
@NgModule({
  declarations: [DataEntryComponent, ActionTableComponent],
  imports: [CommonModule, DataEntryRoutingModule, SharedModule],
  exports: [DataEntryComponent, ActionTableComponent]
})
export class DataEntryModule {}
