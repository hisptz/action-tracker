import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { RootCauseAnalysisConfiguration } from '../../models/root-cause-analysis-configuration.model';
import {
  RootCauseAnalysisConfigurationActions,
  RootCauseAnalysisConfigurationActionTypes,
} from '../actions/root-cause-analysis-configuration.actions';

export interface RootCauseAnalysisConfigurationState
  extends EntityState<RootCauseAnalysisConfiguration> {
  // additional entities state properties
  loading: boolean;
  loaded: boolean;
  hasError: boolean;
  error: any;
  notification: any;
  currentConfig: string;
}

export const adapter: EntityAdapter<RootCauseAnalysisConfiguration> = createEntityAdapter<
  RootCauseAnalysisConfiguration
>();

export const initialState: RootCauseAnalysisConfigurationState = adapter.getInitialState(
  {
    // additional entity state properties
    loading: false,
    loaded: false,
    hasError: false,
    error: null,
    notification: '',
    currentConfig: '',
  }
);

export function rootCauseAnalysisConfigurationReducer(
  state = initialState,
  action: RootCauseAnalysisConfigurationActions
): RootCauseAnalysisConfigurationState {
  switch (action.type) {
    case RootCauseAnalysisConfigurationActionTypes.UpsertRootCauseAnalysisConfiguration: {
      return adapter.upsertOne(
        action.payload.rootCauseAnalysisConfiguration,
        state
      );
    }

    case RootCauseAnalysisConfigurationActionTypes.AddRootCauseAnalysisConfiguration: {
      if (!action.rootCauseAnalysisConfiguration) {
        return { ...state, loading: false, loaded: true };
      }
      return adapter.addOne(action.rootCauseAnalysisConfiguration, {
        ...state,
        loading: false,
        loaded: true,
        currentConfig: action.rootCauseAnalysisConfiguration.id,
      });
    }

    case RootCauseAnalysisConfigurationActionTypes.AddRootCauseAnalysisConfigurationsSuccess: {
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    }

    case RootCauseAnalysisConfigurationActionTypes.UpsertRootCauseAnalysisConfigurations: {
      return adapter.upsertMany(
        action.payload.rootCauseAnalysisConfigurations,
        state
      );
    }

    case RootCauseAnalysisConfigurationActionTypes.UpdateRootCauseAnalysisConfiguration: {
      return adapter.updateOne(
        action.payload.rootCauseAnalysisConfiguration,
        state
      );
    }

    case RootCauseAnalysisConfigurationActionTypes.UpdateRootCauseAnalysisConfigurations: {
      return adapter.updateMany(
        action.payload.rootCauseAnalysisConfigurations,
        state
      );
    }

    case RootCauseAnalysisConfigurationActionTypes.DeleteRootCauseAnalysisConfiguration: {
      return adapter.removeOne(action.payload.id, state);
    }

    case RootCauseAnalysisConfigurationActionTypes.DeleteRootCauseAnalysisConfigurations: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case RootCauseAnalysisConfigurationActionTypes.LoadRootCauseAnalysisConfigurationFail: {
      const message =
      action && action.error && action.error.message
        ? action.error.message
        : 'Failed to delete action, Please try again later!';
      return {
        ...state,
        loading: false,
        loaded: true,
        hasError: true,
        error: action.error,
        notification: {
          completed: true,
          message,
        },
      };
    }

    case RootCauseAnalysisConfigurationActionTypes.ClearRootCauseAnalysisConfigurations: {
      return adapter.removeAll(state);
    }

    default: {
      return state;
    }
  }
}
