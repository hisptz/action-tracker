import {
  adapter,
  State
} from '../reducers/action-tracker-configuration.reducer';
import { getRootState, State as RootState } from '../reducers';
import { createSelector } from '@ngrx/store';
import * as _ from 'lodash';
import {
  getRootCauseAnalysisConfigurationEntities,
  getCurrentRootCauseAnalysisConfiguration
} from './root-cause-analysis-configuration.selectors';

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

export const mergeCurrentActionTrackerConfigWithCurrentRootCauseConfig = createSelector(
  getActionTrackerConfigurationEntities,
  getCurrentActionTrackerConfig,
  getRootCauseAnalysisConfigurationEntities,
  getCurrentRootCauseAnalysisConfiguration,
  (
    actionTrackerConfigurationEntities,
    currentActionTrackerConfig,
    rootCauseAnalysisConfigurationEntities,
    currentRootCauseAnalysisConfiguration
  ) => {
    if (currentRootCauseAnalysisConfiguration && currentActionTrackerConfig) {
      const actionTrackerDataElements = currentActionTrackerConfig.dataElements;
      _.map(actionTrackerDataElements, actionTrackerDataElement => {
        actionTrackerDataElement['isActionTrackerColumn'] = true;
        return actionTrackerDataElement;
      });
      currentActionTrackerConfig.dataElements = [];
      currentActionTrackerConfig.dataElements.push(
        ...currentRootCauseAnalysisConfiguration.dataElements,
        ...actionTrackerDataElements
      );
    } else {
      currentActionTrackerConfig;
    }
    console.log(currentActionTrackerConfig);
    return currentActionTrackerConfig;
  }
);
