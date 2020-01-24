import { createSelector } from "@ngrx/store";
import * as _ from "lodash";

import { getRootState, State as RootState } from "../reducers";
import { adapter, State } from "../reducers/action-tracker-data.reducer";
import {
  getRootCauseAnalysisDataLoadingStatus,
  getRootCauseAnalysisDataNotificationStatus
} from "./root-cause-analysis-data.selectors";
const getActionTrackerDataState = createSelector(
  getRootState,
  (state: RootState) => state.actionTrackerData
);

export const {
  selectEntities: getActionTrackerEntities,
  selectAll: getActionTrackerDatas
} = adapter.getSelectors(getActionTrackerDataState);

export const getActionTrackerDataNotificationStatus = createSelector(
  getActionTrackerDataState,
  (state: State) => state.notification
);

export const getActionTrackerDataLoadingStatus = createSelector(
  getActionTrackerDataState,
  (state: State) => state.loading
);

export const getOveralLoadingStatus = createSelector(
  getActionTrackerDataLoadingStatus,
  getRootCauseAnalysisDataLoadingStatus,
  (actionTrackerDataLoading: boolean, rootCauseDataLoading: boolean) => {
    return rootCauseDataLoading;
  }
);

export const getAllDataNotification = createSelector(
  getRootCauseAnalysisDataNotificationStatus,
  getActionTrackerDataNotificationStatus,
  (rootCauseNotification, actionTrackerNotification) => {
    const notifications = [rootCauseNotification, actionTrackerNotification];
    const currentNotification = (notifications || [])
      .filter((notification: any) => notification && !notification.completed)
      .map((notification: any) => notification.message)[0];

    const completedCount = (notifications || []).filter(
      (notification: any) => notification && notification.completed
    ).length;

    const totalCount = (notifications || []).length;

    const percentCompleted =
      totalCount > 0 ? ((completedCount / totalCount) * 100).toFixed(0) : 0;

    return {
      message: currentNotification,
      percent: percentCompleted
    };
  }
);
