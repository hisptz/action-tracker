import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgxDhis2OrgUnitFilterModule } from '@iapps/ngx-dhis2-org-unit-filter';
import { NgxDhis2PeriodFilterModule } from '@iapps/ngx-dhis2-period-filter';
import { TranslateModule } from '@ngx-translate/core';

import { NgxDhis2SelectionFiltersComponent } from './containers/ngx-dhis2-selection-filters/ngx-dhis2-selection-filters.component';
import { InterventionFilterModule } from './modules/intervention-filter/intervention-filter.module';
import { LegendSetConfigurationModule } from './modules/legend-set-configuration/legend-set-configuration.module';
import { pipes } from './pipes';

@NgModule({
  declarations: [NgxDhis2SelectionFiltersComponent, ...pipes],
  exports: [NgxDhis2SelectionFiltersComponent, LegendSetConfigurationModule],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    NgxDhis2PeriodFilterModule,
    NgxDhis2OrgUnitFilterModule,
    InterventionFilterModule,
    LegendSetConfigurationModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class SelectionFiltersModule {}
