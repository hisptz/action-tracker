import { UserEffects } from './user.effects';
import { SystemInfoEffects } from './system-info.effects';
import { RouterEffects } from './router.effects';
import { ActionTrackerConfigurationEffects } from './action-tracker-configuration.effects';
import { ActionTrackerDataEffects } from './action-tracker-data.effects';
import { GlobalSelectionEffects } from './global-selection.effects';
import { RootCauseAnalysisDataEffects } from './root-cause-analysis-data.effects';
import { RootCauseAnalysisConfigurationEffects } from './root-cause-analysis-configuration.effects';
import { ReportEffects } from './report.effects';
import { TableFieldsSettingsEffects } from './table-fields-settings.effects';

export const effects: any[] = [
  UserEffects,
  SystemInfoEffects,
  RouterEffects,
  ActionTrackerConfigurationEffects,
  ActionTrackerDataEffects,
  RootCauseAnalysisDataEffects,
  RootCauseAnalysisConfigurationEffects,
  GlobalSelectionEffects,
  ReportEffects,
  TableFieldsSettingsEffects
];
