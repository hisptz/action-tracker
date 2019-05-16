import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { ActionTrackerData } from '../../models/action-tracker-data.model';
import {
  ActionTrackerDataActions,
  ActionTrackerDataActionTypes
} from '../actions/action-tracker-data.actions';

export interface State extends EntityState<ActionTrackerData> {
  // additional entities state properties
  // additional entities state properties
  isActive: boolean;
  loading: boolean;
  loaded: boolean;
  notification: { message: string };
  savingColor: string;
  showNotification: boolean;
  showDeleteConfirmation: boolean;
  hasError: boolean;
  error: any;
}

export const adapter: EntityAdapter<ActionTrackerData> = createEntityAdapter<
  ActionTrackerData
>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  // additional entity state properties
  isActive: false,
  loading: false,
  loaded: false,
  notification: null,
  showDeleteConfirmation: false,
  showNotification: false,
  savingColor: 'transparent',
  hasError: false,
  error: null
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
      return adapter.upsertMany(action.actionTrackerDatas, {
        ...state,
        loading: false,
        loaded: true,
        showNotification: false,
        notification: {
          message: 'Action Data Loaded'
        }
      });
    }

    case ActionTrackerDataActionTypes.LoadActionTrackerDatasFail: {
      return { ...state, loading: false, hasError: true, error: action.error };
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

    case ActionTrackerDataActionTypes.ClearActionTrackerDatas: {
      return adapter.removeAll(state);
    }

    case ActionTrackerDataActionTypes.SaveActionTrackerDataSuccess: {
      if (!action.actionTrackerData) {
        return state;
      }
      return adapter.upsertOne(action.actionTrackerData, state);
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
