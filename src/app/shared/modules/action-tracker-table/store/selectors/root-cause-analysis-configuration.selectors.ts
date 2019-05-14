import { createSelector } from "@ngrx/store";
import * as fromRoot from "../reducers";
import * as fromRootCauseConfiguration from "../reducers/root-cause-analysis-configuration.reducer";
import { getCurrentRootCauseAnalysisWidget } from "./root-cause-analysis-widget.selectors";
import { RootCauseAnalysisWidget } from "../models";

export const getRootCauseAnalysisConfigurationState = createSelector(
  fromRoot.getActionTrackerWidgetState,
  (state: fromRoot.ActionTrackerWidgetState) =>
    state.rootCauseAnalysisConfiguration
);

export const getRootCauseAnalysisConfigurationEntities = createSelector(
  getRootCauseAnalysisConfigurationState,
  fromRootCauseConfiguration.getRootCauseAnalysisConfigurationEntitiesState
);

export const getCurrentRootCauseAnalysisConfiguration = createSelector(
  getRootCauseAnalysisConfigurationEntities,
  getCurrentRootCauseAnalysisWidget,
  (
    rootCauseAnalysisConfigurationEntities: any,
    currentRootCauseAnalysisWidget: RootCauseAnalysisWidget
  ) => {
    const configurationId = currentRootCauseAnalysisWidget
      ? currentRootCauseAnalysisWidget.configurationId
      : "";
    return rootCauseAnalysisConfigurationEntities[configurationId];
  }
);

export const getConfigurationLoadingState = createSelector(
  getRootCauseAnalysisConfigurationState,
  fromRootCauseConfiguration.getConfigurationLoadingState
);

export const getConfigurationLoadedState = createSelector(
  getRootCauseAnalysisConfigurationState,
  fromRootCauseConfiguration.getConfigurationLoadedState
);

export const getConfigurationHasErrorState = createSelector(
  getRootCauseAnalysisConfigurationState,
  fromRootCauseConfiguration.getConfigurationHasErrorState
);

export const getConfigurationErrorState = createSelector(
  getRootCauseAnalysisConfigurationState,
  fromRootCauseConfiguration.getConfigurationErrorState
);

export const getConfigurationNotificationState = createSelector(
  getRootCauseAnalysisConfigurationState,
  fromRootCauseConfiguration.getConfigurationNotificationState
);
