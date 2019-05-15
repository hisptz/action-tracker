import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { ActionTrackerData } from '../../models/action-tracker-data.model';
import {
  ActionTrackerDataActions,
  ActionTrackerDataActionTypes
} from '../actions/action-tracker-data.actions';

export interface State extends EntityState<ActionTrackerData> {
  // additional entities state properties
}

export const adapter: EntityAdapter<ActionTrackerData> = createEntityAdapter<
  ActionTrackerData
>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export function reducer(
  state = initialState,
  action: ActionTrackerDataActions
): State {
  switch (action.type) {
    case ActionTrackerDataActionTypes.AddActionTrackerData: {
      return adapter.addOne(action.payload.actionTrackerData, state);
    }

    case ActionTrackerDataActionTypes.UpsertActionTrackerData: {
      return adapter.upsertOne(action.payload.actionTrackerData, state);
    }

    case ActionTrackerDataActionTypes.AddActionTrackerDatas: {
      return adapter.addMany(action.payload.actionTrackerDatas, state);
    }

    case ActionTrackerDataActionTypes.UpsertActionTrackerDatas: {
      return adapter.upsertMany(action.payload.actionTrackerDatas, state);
    }

    case ActionTrackerDataActionTypes.UpdateActionTrackerData: {
      return adapter.updateOne(action.payload.actionTrackerData, state);
    }

    case ActionTrackerDataActionTypes.UpdateActionTrackerDatas: {
      return adapter.updateMany(action.payload.actionTrackerDatas, state);
    }

    case ActionTrackerDataActionTypes.DeleteActionTrackerData: {
      return adapter.removeOne(action.payload.id, state);
    }

    case ActionTrackerDataActionTypes.DeleteActionTrackerDatas: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case ActionTrackerDataActionTypes.LoadActionTrackerDatas: {
      return adapter.addAll(action.payload.actionTrackerDatas, state);
    }

    case ActionTrackerDataActionTypes.ClearActionTrackerDatas: {
      return adapter.removeAll(state);
    }

    default: {
      return state;
    }
  }
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();
