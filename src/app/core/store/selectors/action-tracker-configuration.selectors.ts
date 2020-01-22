import { createSelector } from "@ngrx/store";
import * as _ from "lodash";

import { getRootState, State as RootState } from "../reducers";
import {
  adapter,
  State
} from "../reducers/action-tracker-configuration.reducer";
import { getCurrentRootCauseAnalysisConfiguration } from "./root-cause-analysis-configuration.selectors";

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

export const getCurrentActionTrackerConfigLegend = createSelector(
  getActionTrackerConfigurationState,
  getCurrentActionTrackerConfig,
  (actionTrackerConfigurationsState, currentActionTrackerConfigurations) => {
    return _.get(
      _.find(_.get(currentActionTrackerConfigurations, "dataElements"), {
        formControlName: "actionStatus"
      }),
      "legendSet.legends"
    );
  }
);

export const getMergedActionTrackerConfiguration = createSelector(
  getCurrentActionTrackerConfig,
  getCurrentRootCauseAnalysisConfiguration,
  (currentActionTrackerConfig, currentRootCauseAnalysisConfiguration) => {
    if (currentRootCauseAnalysisConfiguration && currentActionTrackerConfig) {
      const actionTrackerDataElements = currentActionTrackerConfig.dataElements;
      _.map(actionTrackerDataElements, actionTrackerDataElement => {
        actionTrackerDataElement["isActionTrackerColumn"] = true;
        return actionTrackerDataElement;
      });

      _.map(
        currentRootCauseAnalysisConfiguration.dataElements,
        rootCauseConfig => {
          if (
            rootCauseConfig.name == "OrgUnit" ||
            rootCauseConfig.name == "Possible root cause" ||
            rootCauseConfig.name == "Period"
          ) {
            rootCauseConfig["isHidden"] = true;
          }
          return rootCauseConfig;
        }
      );

      currentActionTrackerConfig.dataElements = [];
      currentActionTrackerConfig.dataElements.push(
        ...currentRootCauseAnalysisConfiguration.dataElements,
        ...actionTrackerDataElements
      );
    }
    return currentActionTrackerConfig;
  }
);
