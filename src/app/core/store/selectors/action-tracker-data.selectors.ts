import { createSelector } from '@ngrx/store';
import { getQuarter, getYear, isSameQuarter, setQuarter } from 'date-fns';
import * as _ from 'lodash';

import { ActionTrackerData } from '../../models/action-tracker-data.model';
import { getRootState, State as RootState } from '../reducers';
import {
  ActionTrackerDataState,
  adapter,
} from '../reducers/action-tracker-data.reducer';
import {
  getConfigurationDataElementsFromProgramStageDEs,
  getMergedActionTrackerConfiguration,
} from './action-tracker-configuration.selectors';
import { getDataSelections } from './global-selection.selectors';
import {
  getRootCauseAnalysisDataLoadingStatus,
  getRootCauseAnalysisDataNotificationStatus,
  getRootCauseAnalysisDatas,
} from './root-cause-analysis-data.selectors';

export const getActionTrackerDataState = createSelector(
  getRootState,
  (state: RootState) => state.actionTrackerData
);

export const {
  selectEntities: getActionTrackerEntities,
  selectAll: getActionTrackerDatas,
} = adapter.getSelectors(getActionTrackerDataState);

export const getActionTrackerDataNotificationStatus = createSelector(
  getActionTrackerDataState,
  (state: ActionTrackerDataState) => state.notification
);

export const getActionTrackerShowNotificationStatus = createSelector(
  getActionTrackerDataState,
  (state: ActionTrackerDataState) => state.showNotification
);

export const getNotificationMessageStatus = createSelector(
  getActionTrackerDataState,
  getActionTrackerDataNotificationStatus,
  getActionTrackerShowNotificationStatus,
  (state: ActionTrackerDataState, notification, showNotification) =>
    showNotification ? notification : null
);

export const getActionTrackerDataLoadingStatus = createSelector(
  getActionTrackerDataState,
  (state: ActionTrackerDataState) => state.loading
);

export const getOveralLoadingStatus = createSelector(
  getActionTrackerDataState,
  getActionTrackerDataLoadingStatus,
  getRootCauseAnalysisDataLoadingStatus,

  (
    state: ActionTrackerDataState,
    actionTrackerDataLoading: boolean,
    rootCauseDataLoading: boolean
  ) => {
    return actionTrackerDataLoading || rootCauseDataLoading;
  }
);

export const getActionTrackerDataLoadedStatus = createSelector(
  getActionTrackerDataState,
  (state: ActionTrackerDataState) => state.loaded
);

export const getAllDataNotification = createSelector(
  getActionTrackerDataState,
  getRootCauseAnalysisDataNotificationStatus,
  getActionTrackerDataNotificationStatus,
  (
    state: ActionTrackerDataState,
    rootCauseNotification,
    actionTrackerNotification
  ) => {
    const notifications = [rootCauseNotification, actionTrackerNotification];
    const currentNotification = (notifications || [])
      .filter((notification: any) => notification && !notification.completed)
      .map((notification: any) => notification.message)[0];

    const completedCount = (notifications || []).filter(
      (notification: any) => notification && notification.completed
    ).length;

    const totalCount = (notifications || []).length;

    const percentCompleted =
      totalCount > 0 ? ((completedCount / totalCount) * 100).toFixed(0) : 0;

    return {
      message: currentNotification,
      percent: percentCompleted,
    };
  }
);

export const getYearOfCurrentPeriodSelection = createSelector(
  getActionTrackerDataState,
  getDataSelections,
  (state, dataSelections) => {
    const periodSelectionId =
      _.get(
        _.head(_.get(_.find(dataSelections, { dimension: 'pe' }), 'items')),
        'id'
      ) || '';
    return periodSelectionId.substring(0, 4);
  }
);

export const getActionTrackingQuarters = createSelector(
  getDataSelections,
  (dataSelections) => {
    // TODO: Find best way to deduce quarter periods based on period selections
    const date = new Date();
    const quarterNumber = getQuarter(new Date());
    const currentYear = date.getFullYear();
    const currentQuarterId = `${currentYear}Q${quarterNumber}`;

    return _.filter(
      _.sortBy(
        _.map(
          _.get(
            _.head(_.get(_.find(dataSelections, { dimension: 'pe' }), 'items')),
            'quarterly'
          ) || [],
          (quarter: any) => {
            const splitQuarterId = _.split(_.get(quarter, 'id'), 'Q');
            const dateOfQuarter = setQuarter(
              new Date(_.head(splitQuarterId)),
              _.last(splitQuarterId)
            );
            return {
              ...quarter,
              isCurrentQuater: isSameQuarter(dateOfQuarter, new Date()),
              dateOfQuarter,
              hasEvent: false,
              quarterNumber: _.last(splitQuarterId),
            };
          }
        ),
        'quarterNumber'
      ),
      (quarterPeriod: any) => quarterPeriod.id <= currentQuarterId
    );
  }
);

export const getActionTrackingReportData = createSelector(
  getActionTrackerDataState,
  getActionTrackerDatas,
  getAllDataNotification,
  getConfigurationDataElementsFromProgramStageDEs,
  getActionTrackingQuarters,
  getYearOfCurrentPeriodSelection,
  (
    state: ActionTrackerDataState,
    actionTrackerDatas,
    notification,
    actionTrackerConfig,
    quartersOfSelectedPeriod,
    yearOfCurrentPeriodSelection
  ) => {
    if (notification.percent !== '100') {
      return [];
    }

    // go through actions
    return _.map(actionTrackerDatas, (actionTrackerData: ActionTrackerData) => {
      //TODO: Andre create this structure from the period selection

      let trackerData = {
        ...actionTrackerData,
        isCurrentYear: yearOfCurrentPeriodSelection === getYear(new Date()),
        hasQuarters: quartersOfSelectedPeriod.length > 0,
        actionTrackingColumns: quartersOfSelectedPeriod,
      };

      _.forEach(trackerData.enrollments, (enrollment: any) => {
        _.forEach(_.sortBy(enrollment.events, 'eventDate'), (event: any) => {
          // deduce the quarter of the current event
          let eventQuarter = {
            ...(_.get(
              trackerData,
              `actionTrackingColumns[${_.findIndex(
                trackerData.actionTrackingColumns,
                (quarter) =>
                  getQuarter(
                    new Date(_.head(_.split(event.eventDate, 'T')))
                  ) === quarter.quarterNumber
              )}]`
            ) || {}),
            eventDate: _.head(_.split(event.eventDate, 'T')),
            hasEvent: true,
            eventId: _.get(event, 'event'),
          };

          _.forEach(event.dataValues, (eventDataValues: any) => {
            // merge action tracking stage data elements and data to their respective quarter
            eventQuarter = {
              ...eventQuarter,
              [_.camelCase(
                _.get(
                  _.find(actionTrackerConfig, {
                    id: eventDataValues.dataElement,
                  }),
                  'name'
                )
              )]: eventDataValues.value,
            };

            trackerData = {
              ...trackerData,
              eventQuarter,
              latestStatus:
                _.camelCase(
                  _.get(
                    _.find(actionTrackerConfig, {
                      id: eventDataValues.dataElement,
                    }),
                    'name'
                  )
                ) === 'actionStatus'
                  ? eventDataValues.value
                  : trackerData.latestStatus || '',
            };
          });
        });
      });

      return trackerData;
    });
  }
);

export const getMergedActionTrackerDatas = createSelector(
  getActionTrackerDataState,
  getRootCauseAnalysisDatas,
  getActionTrackerDatas,
  getAllDataNotification,
  getMergedActionTrackerConfiguration,
  getActionTrackingReportData,

  (
    state: ActionTrackerDataState,
    rootCauseDatas,
    actionTrackerDatas,
    notification,
    actionTrackerConfig,
    actionTrackingData
  ) => {
    if (notification.percent !== '100') {
      return [];
    }

    return _.flatten(
      _.map(rootCauseDatas, (rootCauseData: any) => {
        const actions = _.filter(
          actionTrackerDatas,
          (actionTrackerData: any) =>
            _.get(
              _.find(_.get(actionTrackerData, 'attributes'), {
                code: 'BNA_REF',
              }),
              'value'
            ) === rootCauseData.id
        );
        return actions.length > 0
          ? _.map(actions, (action: any) => {
              let dataValues = { ...rootCauseData.dataValues };
              const newAction = {
                ...action,
                rootCauseDataId: rootCauseData.id,
                id: action.trackedEntityInstance,
              };

              _.forEach(action.attributes, (trackedEntityAttribute) => {
                if (
                  _.find(actionTrackerConfig.dataElements, {
                    id: trackedEntityAttribute.attribute,
                  })
                ) {
                  dataValues = {
                    ...dataValues,
                    [trackedEntityAttribute.attribute]:
                      trackedEntityAttribute.value,
                  };
                }
              });

              return {
                ...newAction,
                dataValues,
              };
            })
          : [
              {
                ...rootCauseData,
                rootCauseDataId: rootCauseData.id,
              },
            ];
      })
    );
  }
);

export const getMergedActionTrackerDatasWithRowspanAttribute = createSelector(
  getMergedActionTrackerDatas,
  (mergedActionTrackerDatas) => {
    _.map(
      _.groupBy(mergedActionTrackerDatas, 'rootCauseDataId'),
      (groupedActions, index) => {
        const firstElementOfGroup = _.head(groupedActions);
        firstElementOfGroup.id
          ? _.set(
              _.find(mergedActionTrackerDatas, {
                id: firstElementOfGroup.id,
              }),
              'rowspan',
              groupedActions.length
            )
          : _.set(
              _.find(mergedActionTrackerDatas, {
                rootCauseDataId: firstElementOfGroup.rootCauseDataId,
              }),
              'rowspan',
              groupedActions.length
            );

        _.map(groupedActions, (actionElement) => {
          if (firstElementOfGroup.id !== actionElement.id) {
            _.set(actionElement, 'parentAction', firstElementOfGroup.id);
          }
        });
      }
    );
    return mergedActionTrackerDatas;
  }
);
