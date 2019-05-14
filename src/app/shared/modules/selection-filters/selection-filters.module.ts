import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDhis2SelectionFiltersComponent } from './containers/ngx-dhis2-selection-filters/ngx-dhis2-selection-filters.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDhis2PeriodFilterModule } from '@iapps/ngx-dhis2-period-filter';
import { NgxDhis2OrgUnitFilterModule } from '@iapps/ngx-dhis2-org-unit-filter';
import { pipes } from './pipes';
import { InterventionFilterModule } from './modules/intervention-filter/intervention-filter.module';

@NgModule({
  declarations: [NgxDhis2SelectionFiltersComponent, ...pipes],
  exports: [NgxDhis2SelectionFiltersComponent],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    NgxDhis2PeriodFilterModule,
    NgxDhis2OrgUnitFilterModule,
    InterventionFilterModule
  ]
})
export class SelectionFiltersModule {}
