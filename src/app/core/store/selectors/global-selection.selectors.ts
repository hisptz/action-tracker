import { createSelector } from '@ngrx/store';
import { getRootState, State } from '../reducers';
import { State as GlobalSelection } from '../reducers/global-data-selection.reducer';
import { getCurrentActionTrackerConfig } from './action-tracker-configuration.selectors';
import { getDataParams } from '../../helpers/get-data-params.helper';

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
  (dataSelections: any[], currentActionTrackerCurrent: any) => {
    return getDataParams(dataSelections, currentActionTrackerCurrent);
  }
);

export const getDataSelectionStatus = createSelector(
  getDataSelections,
  (dataSelections: any[]) => dataSelections.length > 0
);
