import { createSelector } from '@ngrx/store';
import * as _ from 'lodash';

import { getRootState, State as RootState } from '../reducers';
import {
  adapter,
  State
} from '../reducers/action-tracker-configuration.reducer';
import { getCurrentRootCauseAnalysisConfiguration } from './root-cause-analysis-configuration.selectors';

import { getAttributeByNameAndValue } from '../../helpers/get-attribute-by-name-and-value.helper';
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
  (actionTrackerConfigEntities: any, currentConfigId: string) => {
    return actionTrackerConfigEntities
      ? actionTrackerConfigEntities[currentConfigId]
      : null;
  }
);

export const getCurrentActionTrackerConfigLegend = createSelector(
  getActionTrackerConfigurationState,
  getCurrentActionTrackerConfig,
  (actionTrackerConfigurationsState, currentActionTrackerConfigurations) => {
    return _.get(
      _.find(_.get(currentActionTrackerConfigurations, 'dataElements'), {
        formControlName: 'actionStatus'
      }),
      'legendSet.legends'
    );
  }
);

export const getConfigurationDataElementsFromTEAs = createSelector(
  getActionTrackerConfigurationState,
  getCurrentActionTrackerConfig,
  (actionTrackerConfigState, currentActionTrackerConfig) =>
    currentActionTrackerConfig
      ? _.compact(
          _.map(
            currentActionTrackerConfig.programTrackedEntityAttributes,
            trackedEntityAttributes =>
              _.merge(
                trackedEntityAttributes.trackedEntityAttribute,
                _.pick(trackedEntityAttributes, 'valueType'),
                {
                  isTrackedEntityAttribute: true,
                  formControlName: _.camelCase(
                    _.get(
                      trackedEntityAttributes.trackedEntityAttribute,
                      'name'
                    )
                  ),
                  isHidden:
                    trackedEntityAttributes.displayInList == true
                      ? false
                      : true,
                  isActionTrackerColumn: true
                }
              )
          )
        )
      : []
);

export const getConfigurationDataElementsFromProgramStageDEs = createSelector(
  getActionTrackerConfigurationState,
  getCurrentActionTrackerConfig,
  (actionTrackerConfigState, currentActionTrackerConfig) =>
    currentActionTrackerConfig
      ? _.compact(
          _.flatMap(currentActionTrackerConfig.programStages, programStage =>
            _.concat(
              _.compact(
                _.map(
                  programStage.programStageDataElements,
                  programStageDataElement => {
                    return programStageDataElement.displayInReports
                      ? _.merge(
                          {
                            name: _.get(
                              programStageDataElement,
                              'dataElement.formName'
                            ),
                            formControlName: _.camelCase(
                              _.get(
                                programStageDataElement,
                                'dataElement.formName'
                              )
                            ),
                            isNotReportColumn: true,
                            isActionTrackerColumn: true,
                            isActionStatus: getAttributeByNameAndValue(
                              programStageDataElement,
                              'isActionStatus',
                              'true'
                            )
                              ? true
                              : false,
                            hasLegend: getAttributeByNameAndValue(
                              programStageDataElement,
                              'hasLegend',
                              'true'
                            )
                              ? true
                              : false
                          },
                          _.pick(programStageDataElement.dataElement, [
                            'id',
                            'valueType'
                          ])
                        )
                      : [];
                  }
                )
              ),
              [
                {
                  name: programStage.executionDateLabel,
                  valueType: 'DATE',
                  isActionTrackerColumn: true,
                  formControlName: 'eventDate',
                  isNotReportColumn: true
                }
              ]
            )
          )
        )
      : []
);

export const getMergedActionTrackerConfiguration = createSelector(
  getCurrentActionTrackerConfig,
  getConfigurationDataElementsFromTEAs,
  getCurrentRootCauseAnalysisConfiguration,
  (
    currentActionTrackerConfig,
    actionTrackerConfigTrackedEntityAttributes,
    currentRootCauseAnalysisConfiguration
  ) => {
    if (currentRootCauseAnalysisConfiguration && currentActionTrackerConfig) {
      _.map(
        currentRootCauseAnalysisConfiguration.dataElements,
        rootCauseConfig => {
          if (
            rootCauseConfig.name == 'OrgUnit' ||
            rootCauseConfig.name == 'Possible root cause' ||
            rootCauseConfig.name == 'Period'
          ) {
            rootCauseConfig['isHidden'] = true;
          }
          return rootCauseConfig;
        }
      );

      currentActionTrackerConfig.dataElements = [];
      currentActionTrackerConfig.dataElements.push(
        ...currentRootCauseAnalysisConfiguration.dataElements,
        ...actionTrackerConfigTrackedEntityAttributes
      );
    }
    return currentActionTrackerConfig;
  }
);
