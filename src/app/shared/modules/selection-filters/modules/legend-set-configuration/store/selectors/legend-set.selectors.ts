import { createSelector, createFeatureSelector } from "@ngrx/store";
import {
  getLegendSetLoadedState,
  getLegendSetLoadingState,
  LegendSetAdapter,
  LegendSetState
} from "../reducers/legend-set.reducer";
import * as _ from "lodash";
const getLegendSetState = createFeatureSelector<LegendSetState>("legendSet");

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

export const getActionStatusLegendSet = createSelector(
  getLegendSetState,
  getAllLegendSets,
  (legendSetState, allLegendSets) =>
    _.find(allLegendSets, { name: "Action Status" })
);

export const getActionStatusLegendSetItems = createSelector(
  getLegendSetState,
  getActionStatusLegendSet,
  (legendSetState, actionStatusLegendSet) =>
    _.get(actionStatusLegendSet, "legends")
);
