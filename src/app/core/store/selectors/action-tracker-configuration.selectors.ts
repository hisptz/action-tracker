import { createSelector } from '@ngrx/store';
import * as _ from 'lodash';

import { getRootState, State as RootState } from '../reducers';
import {
  adapter,
  ActionTrackerConfigurationState,
} from '../reducers/action-tracker-configuration.reducer';
import { getCurrentRootCauseAnalysisConfiguration } from './root-cause-analysis-configuration.selectors';

import { getAttributeByNameAndValue } from '../../helpers/get-attribute-by-name-and-value.helper';
const getActionTrackerConfigurationState = createSelector(
  getRootState,
  (state: RootState) => state.actionTrackerConfigurations
);

export const {
  selectEntities: getActionTrackerConfigurationEntities,
} = adapter.getSelectors(getActionTrackerConfigurationState);

export const getCurrentActionTrackerConfigId = createSelector(
  getActionTrackerConfigurationState,
  (state: ActionTrackerConfigurationState) => state.currentConfig
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
        formControlName: 'actionStatus',
      }),
      'legendSet.legends'
    );
  }
);

export const getConfigurationDataElementsFromTEAs = createSelector(
  getActionTrackerConfigurationState,
  getCurrentActionTrackerConfig,
  (actionTrackerConfigState, currentActionTrackerConfig) => {
    return currentActionTrackerConfig
      ? _.compact(
          _.map(
            currentActionTrackerConfig.programTrackedEntityAttributes,
            (trackedEntityAttributes) => {
              return {
                ...trackedEntityAttributes.trackedEntityAttribute,
                ..._.pick(trackedEntityAttributes, 'valueType'),

                isTrackedEntityAttribute: true,
                formControlName: _.camelCase(
                  _.get(trackedEntityAttributes.trackedEntityAttribute, 'name')
                ),
                required: trackedEntityAttributes.mandatory,
                isHidden: !trackedEntityAttributes.displayInList,
                isActionTrackerColumn: true,
              };
            }
          )
        )
      : [];
  }
);

export const getConfigurationDataElementsFromProgramStageDEs = createSelector(
  getActionTrackerConfigurationState,
  getCurrentActionTrackerConfig,
  (actionTrackerConfigState, currentActionTrackerConfig) =>
    currentActionTrackerConfig
      ? _.compact(
          _.flatMap(currentActionTrackerConfig.programStages, (programStage) =>
            _.concat(
              _.compact(
                _.map(
                  programStage.programStageDataElements,
                  (programStageDataElement) => {
                    return programStageDataElement.displayInReports
                      ? _.merge(
                          {
                            name: _.get(
                              programStageDataElement,
                              'dataElement.formName'
                            ),
                            shortName: _.replace(
                              _.get(
                                programStageDataElement,
                                'dataElement.formName'
                              ),
                              'Action',
                              ''
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
                              : false,
                          },
                          _.pick(programStageDataElement.dataElement, [
                            'id',
                            'valueType',
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
                  isNotReportColumn: true,
                },
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
    currentRootCauseAnalysisConfiguration = currentRootCauseAnalysisConfiguration
      ? currentRootCauseAnalysisConfiguration
      : {};

    const dataElements = [];

    if (currentRootCauseAnalysisConfiguration && currentActionTrackerConfig) {
      _.map(
        currentRootCauseAnalysisConfiguration.dataElements,
        (rootCauseConfig) => {
          return {
            ...rootCauseConfig,
            isHidden:
              rootCauseConfig.name === 'OrgUnit' ||
              rootCauseConfig.name === 'Possible root cause' ||
              rootCauseConfig.name === 'Period',
          };
        }
      );

      currentRootCauseAnalysisConfiguration.dataElements
        ? dataElements.push(
            ...currentRootCauseAnalysisConfiguration.dataElements,
            ...actionTrackerConfigTrackedEntityAttributes
          )
        : dataElements.push(...actionTrackerConfigTrackedEntityAttributes);
    }
    return { ...currentActionTrackerConfig, dataElements };
  }
);
export const getDataElementsFromConfiguration = createSelector(
  getMergedActionTrackerConfiguration,
  (config) => {
    if (config) {
      const { dataElements } = config;

      return (
        _.flattenDeep(
          _.map(dataElements || [], (element) => {
            let newElement = element;
            const { attributeValues } = element;
            if (attributeValues && attributeValues.length) {
              let columnMandatory;
              for (const attributeValue of attributeValues) {
                const { attribute } = attributeValue;
                if (
                  attribute &&
                  attribute.hasOwnProperty('name') &&
                  attribute.name === 'columnMandatory'
                ) {
                  columnMandatory =
                    typeof attributeValue.value === 'boolean'
                      ? attributeValue.value
                      : typeof attributeValue.value === 'string'
                      ? JSON.parse(attributeValue.value)
                      : false;
                  newElement = { ...newElement, columnMandatory };
                }
              }
            }
            return newElement || [];
          })
        ) || []
      );
    } else {
      return [];
    }
  }
);
