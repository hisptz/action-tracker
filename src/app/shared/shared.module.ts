import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { modules } from './modules';
import { NgxDhis2DataFilterModule } from '@iapps/ngx-dhis2-data-filter';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  imports: [
    CommonModule,
    ...modules,
    NgxDhis2DataFilterModule,
    MatCardModule,
    MatProgressBarModule
  ],
  exports: [
    ...modules,
    NgxDhis2DataFilterModule,
    MatCardModule,
    MatProgressBarModule
  ],
  declarations: []
})
export class SharedModule {}
