import { createSelector } from '@ngrx/store';
import * as _ from 'lodash';

import { getRootState, State as RootState } from '../reducers';
import { adapter, State } from '../reducers/action-tracker-data.reducer';
import {
  getRootCauseAnalysisDatas,
  getRootCauseAnalysisDataNotificationStatus,
  getRootCauseAnalysisDataLoadingStatus
} from './root-cause-analysis-data.selectors';

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
    return actionTrackerDataLoading && rootCauseDataLoading;
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
  (rootCauseDatas, actionTrackerDatas, notification) => {
    if (notification.percent !== '100') {
      return [];
    }

    return _.flatten(
      rootCauseDatas.map((rootCauseData: any) => {
        const actions = actionTrackerDatas.filter(
          (actionTrackerData: any) =>
            actionTrackerData.rootCauseDataId === rootCauseData.id
        );
        return actions.length > 0
          ? actions.map((action: any, actionIndex: number) => {
              return {
                ...action,
                dataValues: {
                  ...action.dataValues,
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
