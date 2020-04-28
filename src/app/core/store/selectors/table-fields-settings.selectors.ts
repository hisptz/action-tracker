import { createSelector } from '@ngrx/store';
import * as _ from 'lodash';

import { getRootState, State as RootState } from '../reducers';
import {
  adapter,
  TableFieldsSettingsState,
} from '../reducers/table-fields-settings.reducer';

import {
  getMergedActionTrackerConfiguration,
  getDataElementsFromConfiguration,
} from './action-tracker-configuration.selectors';
const getFieldsSettingsState = createSelector(
  getRootState,
  (state: RootState) => state.tableFieldsSettings
);
export const {
  selectEntities: getTableFieldsSettingsEntities,
  selectAll: getFieldsSettingsData,
  selectTotal,
} = adapter.getSelectors(getFieldsSettingsState);

export const getTableFieldsSettings = createSelector(
  getFieldsSettingsState,
  getFieldsSettingsData,
  (fieldSettingsState, fieldSettingsData) => {
    const data = _.flattenDeep(
      _.map(fieldSettingsData, (fieldSetting) => {
        if (
          fieldSetting &&
          fieldSetting.hasOwnProperty('id') &&
          fieldSetting.hasOwnProperty('name') &&
          fieldSetting.hasOwnProperty('columnMandatory')
        ) {
          return { ...fieldSetting };
        } else {
          return [];
        }
      })
    );
    return data;
  }
);
