import { createSelector } from '@ngrx/store';
import { getRootState, State } from '../reducers';
import { State as GlobalSelection } from '../reducers/global-data-selection.reducer';
import { getCurrentActionTrackerConfig } from './action-tracker-configuration.selectors';
import { getDataParams } from '../../helpers/get-data-params.helper';
import { getSystemInfo } from './system-info.selectors';

export const getGlobalSelectionState = createSelector(
  getRootState,
  (state: State) => state.globalSelection
);

export const getDataSelections = createSelector(
  getGlobalSelectionState,
  (state: GlobalSelection) => state.dataSelections
);

export const getDataSelectionParams = createSelector(
  getDataSelections,
  getCurrentActionTrackerConfig,
  getSystemInfo,
  (
    dataSelections: any[],
    currentActionTrackerCurrent: any,
    systemInfo: any
  ) => {
    return getDataParams(
      dataSelections,
      currentActionTrackerCurrent,
      systemInfo.calendar
    );
  }
);

export const getDataSelectionStatus = createSelector(
  getDataSelections,
  (dataSelections: any[]) => dataSelections.length > 0
);
