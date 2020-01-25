import { createSelector } from "@ngrx/store";
import * as _ from "lodash";

import { getRootState, State as RootState } from "../reducers";
import { adapter, State } from "../reducers/action-tracker-data.reducer";

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
