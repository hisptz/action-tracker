import { RootCauseAnalysisConfigurationEffects } from '../../../../../core/store/effects/root-cause-analysis-configuration.effects';
import { RootCauseAnalysisDataEffects } from '../../../../../core/store/effects/root-cause-analysis-data.effects';
import { RootCauseAnalysisWidgetEffects } from './root-cause-analysis-widget.effects';

export const effects: any[] = [
  RootCauseAnalysisConfigurationEffects,
  RootCauseAnalysisDataEffects,
  RootCauseAnalysisWidgetEffects
];
