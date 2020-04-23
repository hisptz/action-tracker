import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import {
  actionTrackerConfigurationReducer,
  ActionTrackerConfigurationState
} from './action-tracker-configuration.reducer';
import {
  actionTrackerDataReducer,
  ActionTrackerDataState
} from './action-tracker-data.reducer';
import {
  dataSelectionReducer,
  DataSelectionState
} from './global-data-selection.reducer';

import {
  RootCauseAnalysisConfigurationState,
  rootCauseAnalysisConfigurationReducer
} from './root-cause-analysis-configuration.reducer';
import {
  RootCauseAnalysisDataState,
  rootCauseAnalysisDataReducer
} from './root-cause-analysis-data.reducer';
import * as fromSystemInfo from './system-info.reducer';
import * as fromUser from './user.reducer';
import {
  ReportVisualizationState,
  reportVisualizationReducer
} from './report-visualization.reducer';
import { ColumnSettingsState, columnSettingsReducer} from './column-settings.reducer'

export interface State {
  // User state
  user: fromUser.UserState;

  // System info state
  systemInfo: fromSystemInfo.SystemInfoState;

  // Router state
  route: RouterReducerState;

  // Global selections
  globalSelection: DataSelectionState;

  // action tracker configuration
  actionTrackerConfigurations: ActionTrackerConfigurationState;

  actionTrackerData: ActionTrackerDataState;

  rootCauseAnalysisData: RootCauseAnalysisDataState;
  rootCauseAnalysisConfiguration: RootCauseAnalysisConfigurationState;

  reportVisualization: ReportVisualizationState;

  // Column Settings State
  columnSettings: ColumnSettingsState;
}

export const reducers: ActionReducerMap<State> = {
  user: fromUser.reducer,
  systemInfo: fromSystemInfo.reducer,
  route: routerReducer,
  globalSelection: dataSelectionReducer,
  actionTrackerConfigurations: actionTrackerConfigurationReducer,
  actionTrackerData: actionTrackerDataReducer,
  rootCauseAnalysisData: rootCauseAnalysisDataReducer,
  rootCauseAnalysisConfiguration: rootCauseAnalysisConfigurationReducer,
  reportVisualization: reportVisualizationReducer,
  columnSettings: columnSettingsReducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];

/**
 * Root state selector
 */
export const getRootState = (state: State) => state;
