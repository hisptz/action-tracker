import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { LegendSet } from '../../models/legend-set';
import {
  LegendSetActions,
  LegendSetActionTypes
} from '../actions/legend-set.action';

export interface LegendSetState extends EntityState<LegendSet> {
  loading: boolean;
  loaded: boolean;
  hasError: boolean;
  error: any;
  loadInitiated: boolean;
}

export const LegendSetAdapter: EntityAdapter<LegendSet> = createEntityAdapter<
  LegendSet
>();

const initialState: LegendSetState = LegendSetAdapter.getInitialState({
  // additional entity state properties
  loading: false,
  loaded: false,
  loadInitiated: false,
  hasError: false,
  error: null
});

export function legendSetReducer(
  state = initialState,
  action: LegendSetActions
): LegendSetState {
  switch (action.type) {
    case LegendSetActionTypes.LoadLegendSetSuccess: {
      return LegendSetAdapter.addMany(action.payload, {
        ...state,
        loaded: true,
        loading: false
      });
    }

    case LegendSetActionTypes.UpsetLagendSets: {
      return LegendSetAdapter.upsertMany(action.payload.legendSets, state);
    }

    default: {
      return state;
    }
  }
}

export const getLegendSetLoadedState = (state: LegendSetState) => state.loaded;
export const getLegendSetLoadingState = (state: LegendSetState) =>
  state.loading;
