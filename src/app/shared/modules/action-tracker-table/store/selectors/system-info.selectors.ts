import { createSelector } from "@ngrx/store";
import {
  getActionTrackerWidgetState,
  ActionTrackerWidgetState
} from "../reducers";
import { getSystemInfosState } from "../reducers/system-info.reducer";

export const getSystemInfoState = createSelector(
  getActionTrackerWidgetState,
  (state: ActionTrackerWidgetState) => state.systemInfo
);

export const getSystemInfos = createSelector(
  getSystemInfoState,
  getSystemInfosState
);

export const getSystemInfo = createSelector(
  getSystemInfos,
  (systemInfos: any[]) => systemInfos[0]
);
