import { createSelector } from '@ngrx/store';
import { getRootState, State } from '../reducers';
import { State as GlobalSelection } from '../reducers/global-data-selection.reducer';

export const getGlobalSelectionState = createSelector(
  getRootState,
  (state: State) => state.globalSelection
);

export const getDataSelections = createSelector(
  getGlobalSelectionState,
  (state: GlobalSelection) => state.dataSelections
);
