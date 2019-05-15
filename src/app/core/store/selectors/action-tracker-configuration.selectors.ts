import {
  adapter,
  State
} from '../reducers/action-tracker-configuration.reducer';
import { getRootState, State as RootState } from '../reducers';
import { createSelector } from '@ngrx/store';

const getActionTrackerConfigurationState = createSelector(
  getRootState,
  (state: RootState) => state.actionTrackerConfigurations
);

export const {
  selectEntities: getActionTrackerConfigurationEntities
} = adapter.getSelectors(getActionTrackerConfigurationState);

export const getCurrentActionTrackerConfigId = createSelector(
  getActionTrackerConfigurationState,
  (state: State) => state.currentConfig
);

export const getCurrentActionTrackerConfig = createSelector(
  getActionTrackerConfigurationEntities,
  getCurrentActionTrackerConfigId,
  (actionTrackerConfigEntities: any, currentConfigId: string) =>
    actionTrackerConfigEntities
      ? actionTrackerConfigEntities[currentConfigId]
      : null
);
