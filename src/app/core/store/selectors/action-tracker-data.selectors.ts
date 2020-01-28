import { createSelector } from '@ngrx/store';
import * as _ from 'lodash';
import { getQuarter } from 'date-fns';

import { getRootState, State as RootState } from '../reducers';
import { adapter, State } from '../reducers/action-tracker-data.reducer';
import {
  getRootCauseAnalysisDatas,
  getRootCauseAnalysisDataLoadingStatus,
  getRootCauseAnalysisDataNotificationStatus
} from './root-cause-analysis-data.selectors';

import { getMergedActionTrackerConfiguration } from './action-tracker-configuration.selectors';
const getActionTrackerDataState = createSelector(
  getRootState,
  (state: RootState) => state.actionTrackerData
);

export const {
  selectEntities: getActionTrackerEntities,
  selectAll: getActionTrackerDatas
} = adapter.getSelectors(getActionTrackerDataState);

export const getActionTrackerDataNotificationStatus = createSelector(
  getActionTrackerDataState,
  (state: State) => state.notification
);

export const getActionTrackerDataLoadingStatus = createSelector(
  getActionTrackerDataState,
  (state: State) => state.loading
);

export const getOveralLoadingStatus = createSelector(
  getActionTrackerDataLoadingStatus,
  getRootCauseAnalysisDataLoadingStatus,

  (actionTrackerDataLoading: boolean, rootCauseDataLoading: boolean) => {
    return actionTrackerDataLoading || rootCauseDataLoading;
  }
);

export const getAllDataNotification = createSelector(
  getRootCauseAnalysisDataNotificationStatus,
  getActionTrackerDataNotificationStatus,
  (rootCauseNotification, actionTrackerNotification) => {
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

export const getMergedActionTrackerDatas = createSelector(
  getRootCauseAnalysisDatas,
  getActionTrackerDatas,
  getAllDataNotification,
  getMergedActionTrackerConfiguration,

  (rootCauseDatas, actionTrackerDatas, notification, actionTrackerConfig) => {
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
        actions.dataValues = {};
        return actions.length > 0
          ? _.map(actions, (action: any, actionIndex: number) => {
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

              _.map(action.enrollments, enrollment => {
                _.map(_.sortBy(enrollment.events, 'eventDate'), event => {
                  _.map(event.dataValues, eventDataValues => {
                    _.merge(
                      _.get(
                        action,
                        `actionTrackingColumns[${_.findIndex(
                          action.actionTrackingColumns,
                          quarter =>
                            getQuarter(
                              new Date(_.head(_.split(event.eventDate, 'T')))
                            ) == quarter.quarterNumber
                        )}]`
                      ),
                      {
                        [_.camelCase(
                          _.get(
                            _.find(actionTrackerConfig.dataElements, {
                              id: eventDataValues.dataElement
                            }),
                            'name'
                          )
                        )]: eventDataValues.value
                      }
                    );
                    console.log(action.actionTrackingColumns);
                    return _.find(actionTrackerConfig.dataElements, {
                      id: eventDataValues.dataElement
                    })
                      ? _.merge(actions.dataValues, {
                          [eventDataValues.dataElement]: eventDataValues.value
                        })
                      : null;
                  });
                  _.merge(actions.dataValues, {
                    eventDate: _.head(_.split(event.eventDate, 'T'))
                  });
                });
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
  getRootCauseAnalysisDatas,
  getMergedActionTrackerDatas,
  (rootCauseDatas, mergedActionTrackerDatas) => {
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
