import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromRootCauseAnalysisWidget from './root-cause-analysis-widget.reducer';

/**
 * Root state interface
 */
export interface ActionTrackerWidgetState {
  rootCauseAnalysisWidget: fromRootCauseAnalysisWidget.State;
}

export const reducers: ActionReducerMap<ActionTrackerWidgetState> = {
  rootCauseAnalysisWidget: fromRootCauseAnalysisWidget.reducer
};

export const getActionTrackerWidgetState = createFeatureSelector<
  ActionTrackerWidgetState
>('actionTrackerWidget');
