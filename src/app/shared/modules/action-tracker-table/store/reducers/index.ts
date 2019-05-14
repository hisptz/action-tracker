import {
  ActionReducerMap,
  createFeatureSelector,
  MetaReducer
} from "@ngrx/store";
import { RouterReducerState, routerReducer } from "@ngrx/router-store";

import { userReducer, UserState } from "./user.reducer";
import { systemInfoReducer, SystemInfoState } from "./system-info.reducer";
import * as fromRootCauseAnalysisData from "./root-cause-analysis-data.reducer";
import * as fromRootCauseAnalysisWidget from "./root-cause-analysis-widget.reducer";
import * as fromRootCauseAnalysisConfiguration from "./root-cause-analysis-configuration.reducer";

/**
 * Root state interface
 */
export interface ActionTrackerWidgetState {
  /**
   * User state
   */
  user: UserState;

  /**
   * System info state
   */
  systemInfo: SystemInfoState;

  /**
   * Router state
   */
  route: RouterReducerState;
  rootCauseAnalysisData: fromRootCauseAnalysisData.State;
  rootCauseAnalysisWidget: fromRootCauseAnalysisWidget.State;
  rootCauseAnalysisConfiguration: fromRootCauseAnalysisConfiguration.State;
}

export const reducers: ActionReducerMap<ActionTrackerWidgetState> = {
  user: userReducer,
  systemInfo: systemInfoReducer,
  route: routerReducer,
  rootCauseAnalysisData: fromRootCauseAnalysisData.reducer,
  rootCauseAnalysisWidget: fromRootCauseAnalysisWidget.reducer,
  rootCauseAnalysisConfiguration: fromRootCauseAnalysisConfiguration.reducer
};

// export const metaReducers: MetaReducer<State>[] = !environment.production
//   ? []
//   : [];

// /**
//  * Root state selector
//  * @param {State} state
//  * @returns {State} state
//  */
// export const getRootState = (state: State) => state;

// createFeatureSelector

export const getActionTrackerWidgetState = createFeatureSelector<
  ActionTrackerWidgetState
>("actionTrackerWidget");
