import { createSelector } from '@ngrx/store';
import {
  getActionTrackerWidgetState,
  ActionTrackerWidgetState
} from '../reducers';
import * as fromRootCauseWidget from '../reducers/root-cause-analysis-widget.reducer';

export const getRootCauseAnalysisWidgetState = createSelector(
  getActionTrackerWidgetState,
  (state: ActionTrackerWidgetState) => state.rootCauseAnalysisWidget
);

export const getCurrentRootCauseAnalysisWidget = createSelector(
  getRootCauseAnalysisWidgetState,
  (rootCauseWidget: fromRootCauseWidget.State) =>
    rootCauseWidget.entities[rootCauseWidget.currentWidget]
);

export const getWidgetLoadingState = createSelector(
  getRootCauseAnalysisWidgetState,
  fromRootCauseWidget.getWidgetLoadingState
);

export const getWidgetLoadedState = createSelector(
  getRootCauseAnalysisWidgetState,
  fromRootCauseWidget.getWidgetLoadedState
);

export const getWidgetHasErrorState = createSelector(
  getRootCauseAnalysisWidgetState,
  fromRootCauseWidget.getWidgetHasErrorState
);

export const getWidgetErrorState = createSelector(
  getRootCauseAnalysisWidgetState,
  fromRootCauseWidget.getWidgetErrorState
);

export const getWidgetNotificationState = createSelector(
  getRootCauseAnalysisWidgetState,
  fromRootCauseWidget.getWidgetNotificationState
);
