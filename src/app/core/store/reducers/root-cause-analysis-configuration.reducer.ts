import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { RootCauseAnalysisConfiguration } from '../../models/root-cause-analysis-configuration.model';
import {
  RootCauseAnalysisConfigurationActions,
  RootCauseAnalysisConfigurationActionTypes
} from '../actions/root-cause-analysis-configuration.actions';

export interface State extends EntityState<RootCauseAnalysisConfiguration> {
  // additional entities state properties
  loading: boolean;
  loaded: boolean;
  hasError: boolean;
  error: any;
  notification: any;
}

export const adapter: EntityAdapter<
  RootCauseAnalysisConfiguration
> = createEntityAdapter<RootCauseAnalysisConfiguration>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  loading: false,
  loaded: false,
  hasError: false,
  error: null,
  notification: ''
});

export function reducer(
  state = initialState,
  action: RootCauseAnalysisConfigurationActions
): State {
  switch (action.type) {
    case RootCauseAnalysisConfigurationActionTypes.AddRootCauseAnalysisConfiguration: {
      return adapter.addOne(action.rootCauseAnalysisConfiguration, state);
    }

    case RootCauseAnalysisConfigurationActionTypes.UpsertRootCauseAnalysisConfiguration: {
      return adapter.upsertOne(
        action.payload.rootCauseAnalysisConfiguration,
        state
      );
    }

    case RootCauseAnalysisConfigurationActionTypes.AddRootCauseAnalysisConfiguration: {
      if (!action.rootCauseAnalysisConfiguration) {
        return state;
      }
      return adapter.addOne(action.rootCauseAnalysisConfiguration, {
        ...state,
        loading: true,
        loaded: false
      });
    }

    case RootCauseAnalysisConfigurationActionTypes.AddRootCauseAnalysisConfigurationsSuccess: {
      return {
        ...state,
        loading: false,
        loaded: true
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
      return {
        ...state,
        loading: true,
        loaded: false,
        hasError: true,
        error: action.error
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
