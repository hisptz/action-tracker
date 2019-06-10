import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from 'src/environments/environment';

import {
  reducer as actionTrackerConfigurationReducer,
  State as ActionTrackerConfigurationState
} from './action-tracker-configuration.reducer';
import {
  reducer as actionTrackerDataReducer,
  State as ActionTrackerDataState
} from './action-tracker-data.reducer';
import {
  reducer as globalSelectionReducer,
  State as GlobalSelectionState
} from './global-data-selection.reducer';

import {
  State as RootCauseAnalysisConfigurationState,
  reducer as rootCauseAnalysisConfigurationReducer
} from './root-cause-analysis-configuration.reducer';
import {
  State as RootCauseAnalysisDataState,
  reducer as rootCauseAnalysisDataReducer
} from './root-cause-analysis-data.reducer';
import * as fromSystemInfo from './system-info.reducer';
import * as fromUser from './user.reducer';
import {
  ReportVisualizationState,
  reportVisualizationReducer
} from './report-visualization.reducer';

export interface State {
  // User state
  user: fromUser.State;

  // System info state
  systemInfo: fromSystemInfo.State;

  // Router state
  route: RouterReducerState;

  // Global selections
  globalSelection: GlobalSelectionState;

  // action tracker configuration
  actionTrackerConfigurations: ActionTrackerConfigurationState;

  actionTrackerData: ActionTrackerDataState;

  rootCauseAnalysisData: RootCauseAnalysisDataState;
  rootCauseAnalysisConfiguration: RootCauseAnalysisConfigurationState;

  reportVisualization: ReportVisualizationState;
}

export const reducers: ActionReducerMap<State> = {
  user: fromUser.reducer,
  systemInfo: fromSystemInfo.reducer,
  route: routerReducer,
  globalSelection: globalSelectionReducer,
  actionTrackerConfigurations: actionTrackerConfigurationReducer,
  actionTrackerData: actionTrackerDataReducer,
  rootCauseAnalysisData: rootCauseAnalysisDataReducer,
  rootCauseAnalysisConfiguration: rootCauseAnalysisConfigurationReducer,
  reportVisualization: reportVisualizationReducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];

/**
 * Root state selector
 */
export const getRootState = (state: State) => state;
