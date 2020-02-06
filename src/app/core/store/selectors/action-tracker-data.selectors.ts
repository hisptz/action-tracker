import { createSelector } from '@ngrx/store';
import * as _ from 'lodash';
import { getQuarter, isSameQuarter } from 'date-fns';

import { getRootState, State as RootState } from '../reducers';
import {
  adapter,
  ActionTrackerDataState
} from '../reducers/action-tracker-data.reducer';
import {
  getRootCauseAnalysisDatas,
  getRootCauseAnalysisDataLoadingStatus,
  getRootCauseAnalysisDataNotificationStatus
} from './root-cause-analysis-data.selectors';

import {
  getMergedActionTrackerConfiguration,
  getConfigurationDataElementsFromProgramStageDEs
} from './action-tracker-configuration.selectors';
export const getActionTrackerDataState = createSelector(
  getRootState,
  (state: RootState) => state.actionTrackerData
);

export const {
  selectEntities: getActionTrackerEntities,
  selectAll: getActionTrackerDatas
} = adapter.getSelectors(getActionTrackerDataState);

export const getActionTrackerDataNotificationStatus = createSelector(
  getActionTrackerDataState,
  (state: ActionTrackerDataState) => state.notification
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
      percent: percentCompleted
    };
  }
);

export const getActionTrackingReportData = createSelector(
  getActionTrackerDataState,
  getRootCauseAnalysisDatas,
  getActionTrackerDatas,
  getAllDataNotification,
  getConfigurationDataElementsFromProgramStageDEs,

  (
    state: ActionTrackerDataState,
    rootCauseDatas,
    actionTrackerDatas,
    notification,
    actionTrackerConfig
  ) => {
    if (notification.percent !== '100') {
      return [];
    }

    // go through actions
    _.map(actionTrackerDatas, action => {
      //TODO: Andre create this structure from the period selection
      action.actionTrackingColumns = [
        {
          quarterNumber: 1,
          quarterName: 'Q1'
        },
        {
          quarterNumber: 2,
          quarterName: 'Q2'
        },
        {
          quarterNumber: 3,
          quarterName: 'Q3'
        },
        {
          quarterNumber: 4,
          quarterName: 'Q4'
        }
      ];
      //go through enrollments
      _.map(action.enrollments, enrollment => {
        //go through events sorted by event date
        _.map(_.sortBy(enrollment.events, 'eventDate'), event => {
          //deduce the quarter of the current event
          const eventQuarter = _.get(
            action,
            `actionTrackingColumns[${_.findIndex(
              action.actionTrackingColumns,
              quarter =>
                getQuarter(new Date(_.head(_.split(event.eventDate, 'T')))) ==
                quarter.quarterNumber
            )}]`
          );

          _.set(
            eventQuarter,
            'eventDate',
            _.head(_.split(event.eventDate, 'T'))
          );
          eventQuarter.isCurrentQuater = isSameQuarter(
            new Date(_.head(_.split(event.eventDate, 'T'))),
            new Date()
          );
          eventQuarter.id = _.get(event, 'event');

          _.map(event.dataValues, eventDataValues => {
            //merge action tracking stage data elements and data to their respective quarter
            _.merge(eventQuarter, {
              [_.camelCase(
                _.get(
                  _.find(actionTrackerConfig, {
                    id: eventDataValues.dataElement
                  }),
                  'name'
                )
              )]: eventDataValues.value
            });
          });
        });
      });
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
                code: 'BNA_REF'
              }),
              'value'
            ) === rootCauseData.id
        );
        return actions.length > 0
          ? _.map(actions, (action: any, actionIndex: number) => {
              actions.dataValues = {};

              _.map(action.attributes, trackedEntityAttribute => {
                _.find(actionTrackerConfig.dataElements, {
                  id: trackedEntityAttribute.attribute
                })
                  ? _.merge(actions.dataValues, {
                      [trackedEntityAttribute.attribute]:
                        trackedEntityAttribute.value
                    })
                  : null;
                _.set(action, 'rootCauseDataId', rootCauseData.id);
              });
              return {
                ...action,
                id: action.trackedEntityInstance,
                dataValues: {
                  ...actions.dataValues,
                  ...rootCauseData.dataValues
                }
              };
            })
          : [
              {
                ...rootCauseData,
                rootCauseDataId: rootCauseData.id,
                id: undefined
              }
            ];
      })
    );
  }
);

export const getMergedActionTrackerDatasWithRowspanAttribute = createSelector(
  getActionTrackerDataState,
  getRootCauseAnalysisDatas,
  getMergedActionTrackerDatas,
  (state, rootCauseDatas, mergedActionTrackerDatas) => {
    _.map(
      _.groupBy(mergedActionTrackerDatas, 'rootCauseDataId'),
      (groupedActions, index) => {
        const firstElementOfGroup = _.head(groupedActions);
        firstElementOfGroup.id
          ? _.set(
              _.find(mergedActionTrackerDatas, {
                id: firstElementOfGroup.id
              }),
              'rowspan',
              groupedActions.length
            )
          : _.set(
              _.find(mergedActionTrackerDatas, {
                rootCauseDataId: firstElementOfGroup.rootCauseDataId
              }),
              'rowspan',
              groupedActions.length
            );

        _.map(groupedActions, actionElement => {
          if (firstElementOfGroup.id !== actionElement.id) {
            _.set(actionElement, 'parentAction', firstElementOfGroup.id);
          }
        });
      }
    );
    return mergedActionTrackerDatas;
  }
);
