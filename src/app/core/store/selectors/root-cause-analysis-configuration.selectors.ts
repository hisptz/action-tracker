import { createSelector } from '@ngrx/store';
import {
  State,
  adapter
} from '../reducers/root-cause-analysis-configuration.reducer';
import { getRootState, State as RootState } from '../reducers';

export const getRootCauseAnalysisConfigurationState = createSelector(
  getRootState,
  (state: RootState) => state.rootCauseAnalysisConfiguration
);

export const {
  selectEntities: getRootCauseAnalysisConfigurationEntities
} = adapter.getSelectors(getRootCauseAnalysisConfigurationState);

export const getCurrentConfigId = createSelector(
  getRootCauseAnalysisConfigurationState,
  (state: State) => state.currentConfig
);

export const getCurrentRootCauseAnalysisConfiguration = createSelector(
  getRootCauseAnalysisConfigurationEntities,
  getCurrentConfigId,
  (rootCauseAnalysisConfigurationEntities: any, configId: string) => {
    return rootCauseAnalysisConfigurationEntities[configId];
  }
);

export const getConfigurationLoadingStatus = createSelector(
  getRootCauseAnalysisConfigurationState,
  (state: State) => state.loading
);

export const getConfigurationLoadedStatus = createSelector(
  getRootCauseAnalysisConfigurationState,
  (state: State) => state.loaded
);

export const getConfigurationHasErrorStatus = createSelector(
  getRootCauseAnalysisConfigurationState,
  (state: State) => state.hasError
);

export const getConfigurationErrorStatus = createSelector(
  getRootCauseAnalysisConfigurationState,
  (state: State) => state.error
);

export const getConfigurationNotificationStatus = createSelector(
  getRootCauseAnalysisConfigurationState,
  (state: State) => state.notification
);
