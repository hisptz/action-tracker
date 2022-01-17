import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { ActionTrackerData } from '../../models/action-tracker-data.model';
import {
  ActionTrackerDataActions,
  ActionTrackerDataActionTypes,
} from '../actions/action-tracker-data.actions';

export interface ActionTrackerDataState extends EntityState<ActionTrackerData> {
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
  selectId: (action: ActionTrackerData) => action.trackedEntityInstance,
});

export const initialState: ActionTrackerDataState = adapter.getInitialState({
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
  error: null,
});

export function actionTrackerDataReducer(
  state = initialState,
  action: ActionTrackerDataActions
): ActionTrackerDataState {
  switch (action.type) {
    case ActionTrackerDataActionTypes.AddActionTrackerData: {
      return adapter.upsertOne(action.actionTrackerData, state);
    }

    case ActionTrackerDataActionTypes.AddActionTrackerDataSuccess: {
      return state;
    }
    case ActionTrackerDataActionTypes.AddActionTrackerDataFail: {
      const message =
        action && action.error && action.error.message
          ? action.error.message
          : 'Failed to load Action Tracker data, Please try again later!';
      return {
        ...state,
        showNotification: true,
        notification: {
          completed: true,
          message,
        },
        loading: false,
        hasError: true,
        error: action.error,
      };
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
          message: 'Action Data Loaded',
        },
      });
    }

    case ActionTrackerDataActionTypes.LoadActionTrackerDatasFail: {
      return {
        ...state,
        showNotification: true,
        notification: {
          completed: true,
          message: 'Error Loading Action Tracker Data',
        },
        loading: false,
        hasError: true,
        error: action.error,
      };
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
        showNotification: true,
        notification: {
          completed: true,
          message: 'Deleting Action Data ' + action.actionTrackerDataId,
        },
      });
    }

    case ActionTrackerDataActionTypes.DeleteActionTrackerDataSuccess: {
      return adapter.removeOne(action.id, {
        ...state,
        showNotification: true,
        notification: {
          completed: true,
          message:
            'Action Data ' + action.id + ' Has been Successfully Deleted',
        },
      });
    }

    case ActionTrackerDataActionTypes.DeleteActionTrackerDataFail: {
      const message =
        action && action.error && action.error.message
          ? action.error.message
          : 'Failed to delete action, Please try again later!';
      return {
        ...state,
        showNotification: true,
        notification: {
          completed: true,
          message,
        },
        loading: false,
        hasError: true,
        error: action.error,
      };
    }

    case ActionTrackerDataActionTypes.DeleteActionTrackerDatas: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case ActionTrackerDataActionTypes.ClearActionTrackerDatas: {
      return adapter.removeAll(state);
    }

    case ActionTrackerDataActionTypes.SaveActionTrackerData: {
      return {
        ...state,
        showNotification: true,
        notification: {
          completed: true,
          message: 'Saving Action Data',
        },
      };
    }

    case ActionTrackerDataActionTypes.SaveActionTrackerDataSuccess: {
      if (!action.actionTrackerData) {
        return state;
      }
      return adapter.upsertOne(action.actionTrackerData, {
        ...state,
        showNotification: true,
        notification: {
          completed: true,
          message: 'Action Data Successfully Saved',
        },
      });
    }
    case ActionTrackerDataActionTypes.SaveActionTrackerDataFail: {
      const message =
        action && action.error && action.error.message
          ? action.error.message
          : 'Failed to save Action, Please try again later!';
      return {
        ...state,
        showNotification: true,
        notification: {
          completed: true,
          message,
        },
        loading: false,
        hasError: true,
        error: action.error,
      };
    }

    case ActionTrackerDataActionTypes.ResetNotifications: {
      return {
        ...state,
        showNotification: false,
        notification: {
          completed: true,
          message: 'Reseting notification',
        },
      };
    }

    case ActionTrackerDataActionTypes.LoadActionTrackerDatas: {
      return adapter.removeAll({
        ...state,
        loading: true,
        loaded: false,
        showNotification: false,
        notification: {
          completed: false,
          message: 'Loading Action Tracker Data',
        },
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
  selectTotal,
} = adapter.getSelectors();
