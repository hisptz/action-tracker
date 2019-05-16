import { createSelector } from '@ngrx/store';
import * as _ from 'lodash';

import { getRootState, State as RootState } from '../reducers';
import { adapter } from '../reducers/action-tracker-data.reducer';
import { getRootCauseAnalysisDatas } from './root-cause-analysis-data.selectors';

const getActionTrackerDataState = createSelector(
  getRootState,
  (state: RootState) => state.actionTrackerData
);

export const {
  selectEntities: getActionTrackerEntities,
  selectAll: getActionTrackerDatas
} = adapter.getSelectors(getActionTrackerDataState);

export const getMergedActionTrackerDatas = createSelector(
  getRootCauseAnalysisDatas,
  getActionTrackerDatas,
  (rootCauseDatas, actionTrackerDatas) => {
    if (rootCauseDatas.length === 0 && actionTrackerDatas.length === 0) {
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
