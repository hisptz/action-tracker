import { createSelector, createFeatureSelector } from '@ngrx/store';
import {
  getLegendSetLoadedState,
  getLegendSetLoadingState,
  LegendSetAdapter,
  LegendSetState
} from '../reducers/legend-set.reducer';
const getLegendSetState = createFeatureSelector<LegendSetState>('legendSet');

export const {
  selectIds: getLegendSetsIds,
  selectEntities: getLegendSetsEntities,
  selectAll: getAllLegendSets,
  selectTotal: getTotalLegendSets
} = LegendSetAdapter.getSelectors(getLegendSetState);

export const getLegendSetLoaded = createSelector(
  getLegendSetState,
  getLegendSetLoadedState
);

export const getLegendSetLoading = createSelector(
  getLegendSetState,
  getLegendSetLoadingState
);
