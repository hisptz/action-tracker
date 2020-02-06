import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared';

import { DataEntryComponent } from './containers/data-entry/data-entry.component';
import { DataEntryRoutingModule } from './data-entry-routing.module';

import { pipes } from 'src/app/shared/pipes/index';
@NgModule({
  declarations: [DataEntryComponent],
  imports: [CommonModule, DataEntryRoutingModule, SharedModule],
  exports: [DataEntryComponent]
})
export class DataEntryModule {}
