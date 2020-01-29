import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { ActionTrackerData } from '../../models/action-tracker-data.model';
import {
  ActionTrackerDataActions,
  ActionTrackerDataActionTypes
} from '../actions/action-tracker-data.actions';
import * as _ from 'lodash';
import { openEntryForm } from '../../helpers/open-entry-form.helper';

export interface State extends EntityState<ActionTrackerData> {
  // additional entities state properties
  // additional entities state properties
  isActive: boolean;
  loading: boolean;
  loaded: boolean;
  notification: { message: string; completed: boolean };
  savingColor: string;
  showNotification: boolean;
  showDeleteConfirmation: boolean;
  hasError: boolean;
  error: any;
}

export const adapter: EntityAdapter<ActionTrackerData> = createEntityAdapter<
  ActionTrackerData
>({
  selectId: (action: ActionTrackerData) => action.trackedEntityInstance
});

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
      return adapter.addOne(action.actionTrackerData, state);
    }

    case ActionTrackerDataActionTypes.AddActionTrackerDataSuccess: {
      return state;
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
          completed: true,
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

    case ActionTrackerDataActionTypes.CancelActionTrackerData: {
      return adapter.removeOne(action.actionTrackerData.id, state);
    }

    case ActionTrackerDataActionTypes.CancelActionTrackerDataSuccess: {
      // openEntryForm(action.actionTrackerData);
      return state;
    }

    case ActionTrackerDataActionTypes.DeleteActionTrackerData: {
      if (!action.actionTrackerDataId) {
        return state;
      }
      return adapter.removeOne(action.actionTrackerDataId, {
        ...state,
        notification: {
          completed: false,
          message: 'Deleting Action Data ' + action.actionTrackerDataId
        }
      });
    }

    case ActionTrackerDataActionTypes.DeleteActionTrackerDataSuccess: {
      return adapter.removeOne(action.id, {
        ...state,
        notification: {
          completed: true,
          message: 'Action Data ' + action.id + ' Has been Successfully Deleted'
        }
      });
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

    case ActionTrackerDataActionTypes.LoadActionTrackerDatas: {
      return adapter.removeAll({
        ...state,
        loading: true,
        loaded: false,
        showNotification: true,
        notification: {
          completed: false,
          message: 'Loading Action Tracker Data'
        }
      });
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
