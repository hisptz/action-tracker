import { OrgUnitFilterConfig } from '@iapps/ngx-dhis2-org-unit-filter';
import { PeriodFilterConfig } from '@iapps/ngx-dhis2-period-filter';

export interface SelectionFilterConfig {
  showDataFilter?: boolean;
  showPeriodFilter?: boolean;
  showOrgUnitFilter?: boolean;
  showLegendFilter?: boolean;
  showLayout?: boolean;
  showFilterButton?: boolean;
  orgUnitFilterConfig?: OrgUnitFilterConfig;
  periodFilterConfig?: PeriodFilterConfig;
}
