import { createSelector } from '@ngrx/store';
import * as _ from 'lodash';

import { getRootState, State as RootState } from '../reducers';
import {
  adapter,
  ColumnSettingsState,
} from '../reducers/column-settings.reducer';
import { getMergedActionTrackerConfiguration } from './action-tracker-configuration.selectors';

export const {
  selectEntities: getColumnSettingsEntities,
  selectAll: getColumneSettingsDatas,
  selectTotal,
} = adapter.getSelectors();

const getColumnSettingsState = createSelector(
  getRootState,
  (state: RootState) => state.columnSettings
);
export const getColumnSettingsInitialData = createSelector(
  getMergedActionTrackerConfiguration,
  (actionTrackerConfig) => {
    const { dataElements } = actionTrackerConfig;

    if (dataElements) {
      return _.map(
        _.filter(dataElements, (element) => {
          return element && !element.isHidden;
        }),
        (filtered) => {
          if (filtered && filtered.id) {
            return { id: filtered.id, name: filtered.name, isVisible: true };
          } else {
            return '';
          }
        }
      );
    }
  }
);
export const getColumnSettingsData = createSelector(
  getColumnSettingsState,
  getColumnSettingsInitialData,
  (columnSettingsState: ColumnSettingsState, intialConfig) => {
    const columnSettings =
      selectTotal(columnSettingsState) > 0
        ? getColumneSettingsDatas(columnSettingsState)
        : intialConfig;
    const columnSettingObj = {};
    for (const setting of columnSettings) {
      const { id, isVisible } = setting;
      columnSettingObj[id] = isVisible;
    }
    return columnSettingObj;
  }
);

export const getColumnSettingsDataAfterSet = createSelector(
  getColumnSettingsState,
  (state: ColumnSettingsState) => state.loaded
);
