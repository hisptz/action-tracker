import { RouterEffects } from "../../../../../core/store/effects/router.effects";
import { SystemInfoEffects } from "./system-info.effects";
import { UserEffects } from "./user.effects";
import { RootCauseAnalysisConfigurationEffects } from "./root-cause-analysis-configuration.effects";
import { RootCauseAnalysisDataEffects } from "./root-cause-analysis-data.effects";
import { RootCauseAnalysisWidgetEffects } from "./root-cause-analysis-widget.effects";

export const effects: any[] = [
  RouterEffects,
  SystemInfoEffects,
  UserEffects,
  RootCauseAnalysisConfigurationEffects,
  RootCauseAnalysisDataEffects,
  RootCauseAnalysisWidgetEffects
];
