import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { ActionTrackerConfiguration } from "../../models/action-tracker-configuration.model";
import {
  ActionTrackerConfigurationActions,
  ActionTrackerConfigurationActionTypes
} from "../actions/action-tracker-configuration.actions";

export interface State extends EntityState<ActionTrackerConfiguration> {
  // additional entities state properties
  loading: boolean;
  loaded: boolean;
  hasError: boolean;
  error: any;
  currentConfig: string;
}

export const adapter: EntityAdapter<ActionTrackerConfiguration> = createEntityAdapter<
  ActionTrackerConfiguration
>();

export const initialState: State = adapter.getInitialState({
  loading: false,
  loaded: false,
  hasError: false,
  error: null,
  currentConfig: "ROSaojkGieB"
});

export function reducer(
  state = initialState,
  action: ActionTrackerConfigurationActions
): State {
  switch (action.type) {
    case ActionTrackerConfigurationActionTypes.UpsertActionTrackerConfiguration: {
      return adapter.upsertOne(
        action.payload.actionTrackerConfiguration,
        state
      );
    }

    case ActionTrackerConfigurationActionTypes.AddActionTrackerConfigurations: {
      return adapter.addMany(action.payload.actionTrackerConfigurations, state);
    }

    case ActionTrackerConfigurationActionTypes.UpsertActionTrackerConfigurations: {
      return adapter.upsertMany(
        action.payload.actionTrackerConfigurations,
        state
      );
    }

    case ActionTrackerConfigurationActionTypes.UpdateActionTrackerConfiguration: {
      return adapter.updateOne(
        action.payload.actionTrackerConfiguration,
        state
      );
    }

    case ActionTrackerConfigurationActionTypes.UpdateActionTrackerConfigurations: {
      return adapter.updateMany(
        action.payload.actionTrackerConfigurations,
        state
      );
    }

    case ActionTrackerConfigurationActionTypes.DeleteActionTrackerConfiguration: {
      return adapter.removeOne(action.payload.id, state);
    }

    case ActionTrackerConfigurationActionTypes.DeleteActionTrackerConfigurations: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case ActionTrackerConfigurationActionTypes.LoadActionTrackerConfiguration: {
      return {
        ...state,
        loading: true
      };
    }

    case ActionTrackerConfigurationActionTypes.AddActionTrackerConfiguration: {
      if (!action.actionTrackerConfig) {
        return state;
      }

      return adapter.addOne(action.actionTrackerConfig, state);
    }

    case ActionTrackerConfigurationActionTypes.ClearActionTrackerConfigurations: {
      return adapter.removeAll(state);
    }

    default: {
      return state;
    }
  }
}
