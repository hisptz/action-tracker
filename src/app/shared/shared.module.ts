import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { modules } from './modules';
import { NgxDhis2DataFilterModule } from '@iapps/ngx-dhis2-data-filter';

@NgModule({
  imports: [CommonModule, ...modules, NgxDhis2DataFilterModule],
  exports: [...modules, NgxDhis2DataFilterModule],
  declarations: []
})
export class SharedModule {}
