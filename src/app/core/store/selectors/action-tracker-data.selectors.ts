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
              id: quarter.id,
              name: quarter.name,
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

    return _.map(actionTrackerDatas, (actionTrackerData: ActionTrackerData) => {
      // TODO: Andre create this structure from the period selection

      let trackerData = {
        ...actionTrackerData,
        isCurrentYear: yearOfCurrentPeriodSelection === getYear(new Date()),
        hasQuarters: quartersOfSelectedPeriod.length > 0,
        actionTrackingColumns: quartersOfSelectedPeriod,
      };

      const enrollment = _.head(trackerData.enrollments || []);

      const actionEvents = _.sortBy(
        enrollment ? enrollment.events : [],
        'eventDate'
      );

      const actionStatusConfig = _.find(actionTrackerConfig, [
        'formControlName',
        'actionStatus',
      ]);

      const latestEvent = _.head(_.reverse(actionEvents)); //Fixes the latest status issue

      const latestStatusEvent = _.find(
        latestEvent ? latestEvent.dataValues : [],
        ['dataElement', actionStatusConfig ? actionStatusConfig.id : '']
      );

      return {
        ...trackerData,
        latestStatus: latestStatusEvent ? latestStatusEvent.value : '',
        actionTrackingColumns: quartersOfSelectedPeriod.map(
          (selectedPeriodQuarter: any) => {
            const selectedEvent = _.head(
              _.sortBy(
                actionEvents.filter(
                  (actionEvent: any) =>
                    getQuarter(new Date(actionEvent.eventDate)) ===
                    parseInt(selectedPeriodQuarter.quarterNumber, 10)
                ),
                'eventDate'
              )
            );

            if (selectedEvent) {
              let dataValues = {};
              selectedEvent.dataValues.forEach((dataValue: any) => {
                dataValues = {
                  ...dataValues,
                  [_.camelCase(
                    _.get(
                      _.find(actionTrackerConfig, {
                        id: dataValue.dataElement,
                      }),
                      'name'
                    )
                  )]: dataValue.value,
                };
              });
              return {
                ...selectedPeriodQuarter,
                ...dataValues,
                hasEvent: true,
                eventId: selectedEvent.event,
                eventDate: _.head(_.split(selectedEvent.eventDate, 'T')),
              };
            }

            return selectedPeriodQuarter;
          }
        ),
      };
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
          actionTrackingData,
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

export const getMergedActionTrackerDatasWithRowspanAttribute = (
  latestStatus?: any
) =>
  createSelector(getMergedActionTrackerDatas, (mergedActionTrackerDatas) => {
    const statusFilteredActionTrackerDatas = latestStatus
      ? (mergedActionTrackerDatas || []).filter(
          (item: any) => item['latestStatus'] === latestStatus.id
        )
      : mergedActionTrackerDatas;
    console.log(mergedActionTrackerDatas);
    _.map(
      _.groupBy(statusFilteredActionTrackerDatas, 'rootCauseDataId'),
      (groupedActions, index) => {
        const firstElementOfGroup = _.head(groupedActions);
        firstElementOfGroup.id
          ? _.set(
              _.find(statusFilteredActionTrackerDatas, {
                id: firstElementOfGroup.id,
              }),
              'rowspan',
              groupedActions.length
            )
          : _.set(
              _.find(statusFilteredActionTrackerDatas, {
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
    return statusFilteredActionTrackerDatas;
  });
