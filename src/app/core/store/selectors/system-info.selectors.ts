import { createSelector } from '@ngrx/store';
import { getRootState, State } from '../reducers';
import { getSystemInfosState } from '../reducers/system-info.reducer';
import { SystemInfo } from '../../models';

export const getSystemInfoState = createSelector(
  getRootState,
  (state: State) => state.systemInfo
);

export const getSystemInfos = createSelector(
  getSystemInfoState,
  getSystemInfosState
);

export const getSystemInfo = createSelector(
  getSystemInfos,
  (systemInfos: any[]) => systemInfos[0]
);

export const getCurrentCalendarId = createSelector(
  getSystemInfo,
  (systemInfo: SystemInfo) => systemInfo.calendar || null
);
