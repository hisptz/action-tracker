import { createSelector } from '@ngrx/store';
import * as _ from 'lodash';

import { getRootState, State as RootState } from '../reducers';
import {
  adapter,
  RootCauseAnalysisDataState
} from '../reducers/root-cause-analysis-data.reducer';
import { getCurrentRootCauseAnalysisConfiguration } from './root-cause-analysis-configuration.selectors';
import { getRouterParams } from './router.selectors';
import { RootCauseAnalysisConfiguration } from '../../models/root-cause-analysis-configuration.model';
import { RootCauseAnalysisData } from '../../models/root-cause-analysis-data.model';

export const getRootCauseAnalysisDataState = createSelector(
  getRootState,
  (state: RootState) => state.rootCauseAnalysisData
);

export const {
  selectEntities: getRootCauseAnalysisDataEntities,
  selectAll: getRootCauseAnalysisDatas
} = adapter.getSelectors(getRootCauseAnalysisDataState);

export const getRootCauseAnalysisDataLoadingStatus = createSelector(
  getRootCauseAnalysisDataState,
  (state: RootCauseAnalysisDataState) => state.loading
);
export const getRootCauseAnalysisDataLoadedStatus = createSelector(
  getRootCauseAnalysisDataState,
  (state: RootCauseAnalysisDataState) => state.loaded
);
export const getRootCauseAnalysisDataHasErrorStatus = createSelector(
  getRootCauseAnalysisDataState,
  (state: RootCauseAnalysisDataState) => state.hasError
);
export const getRootCauseAnalysisDataSavingColorStatus = createSelector(
  getRootCauseAnalysisDataState,
  (state: RootCauseAnalysisDataState) => state.savingColor
);
export const getRootCauseAnalysisDataErrorStatus = createSelector(
  getRootCauseAnalysisDataState,
  (state: RootCauseAnalysisDataState) => state.error
);
export const getRootCauseAnalysisDataNotificationStatus = createSelector(
  getRootCauseAnalysisDataState,
  (state: RootCauseAnalysisDataState) => state.notification
);

export const getAllRootCauseAnalysisData = createSelector(
  getRootCauseAnalysisDatas,
  getCurrentRootCauseAnalysisConfiguration,
  getRouterParams,
  (
    rootCauseAnalysisDatas,
    currentConfiguration: RootCauseAnalysisConfiguration,
    routeParams
  ) => {
    return _.map(
      rootCauseAnalysisDatas,
      (rootCauseAnalysisData: RootCauseAnalysisData) => {
        const newDataValues = {};
        _.each(
          currentConfiguration ? currentConfiguration.dataElements : [],
          (dataElement: any) => {
            newDataValues[dataElement.id] = dataElement.routerParam
              ? routeParams
                ? routeParams[dataElement.routerParam.namespace]
                  ? routeParams[dataElement.routerParam.namespace][
                      dataElement.routerParam.key
                    ]
                  : ''
                : ''
              : rootCauseAnalysisData.dataValues[dataElement.id];
          }
        );
        return {
          ...rootCauseAnalysisData,
          rootCauseDataId: rootCauseAnalysisData.id,
          dataValues: rootCauseAnalysisData.isActive
            ? newDataValues
            : rootCauseAnalysisData.dataValues
        };
      }
    );
  }
);

export const getRootCauseDataLoadingCompletionStatus = createSelector(
  getRootCauseAnalysisDataState,
  (state: RootCauseAnalysisDataState) =>
    state && state.completedDataCount === state.dataCount && state.loaded
);
