import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { ActionTrackerConfiguration } from '../../models/action-tracker-configuration.model';
import {
  TableFieldsSettingsActions,
  TableFieldsSettingsTypes,
} from '../actions/table-fields-settings.actions';

export interface TableFieldsSettingsState extends EntityState<any> {
  // additional entities state properties
  loading: boolean;
  loaded: boolean;
  hasError: boolean;
  error: any;
  currentConfig: string;
}
export const adapter: EntityAdapter<any> = createEntityAdapter<any>();
export const initialState: any = adapter.getInitialState({
  loading: false,
  loaded: false,
  hasError: false,
  error: null,
  currentConfig: 'ROSaojkGieB',
});

export function tableFieldsSettingsReducer(
  state = initialState,
  action: TableFieldsSettingsActions
): any {
  switch (action.type) {
    case TableFieldsSettingsTypes.CheckMandatorySettingsExist: {
      return {
        ...state,
        loading: true,
      };
    }
    case TableFieldsSettingsTypes.CheckMandatorySettingsExistSuccess: {
      return adapter.addAll(action.payload, state);
    }

    case TableFieldsSettingsTypes.CheckMandatorySettingsExistFailure: {
      return { ...state, loading: false, hasError: true };
    }
    case TableFieldsSettingsTypes.LoadMandatoryFieldsForTheTable: {
      return {
        ...state,
        loading: true,
      };
    }
    case TableFieldsSettingsTypes.LoadMandatoryFieldsForTheTableSuccess: {
      return adapter.addAll(action.payload, state);
    }
    case TableFieldsSettingsTypes.LoadMandatoryFieldsForTheTableFailure: {
      return { ...state, loading: false, hasError: true };
    }

    case TableFieldsSettingsTypes.CreateMandatoryFieldsForTheTable: {
      return {
        ...state,
        loading: true,
      };
    }
    case TableFieldsSettingsTypes.CreateMandatoryFieldsForTheTableSuccess: {
      return adapter.addAll(action.payload, state);
    }
    case TableFieldsSettingsTypes.CreateMandatoryFieldsForTheTableFailure: {
      return { ...state, loading: false, hasError: true };
    }
    case TableFieldsSettingsTypes.UpdateMandatoryFieldsForTheTable: {
      return {
        ...state,
        loading: true,
      };
    }
    case TableFieldsSettingsTypes.UpdateMandatoryFieldsForTheTableSuccess: {
      return adapter.addAll(action.payload, state);
    }
    case TableFieldsSettingsTypes.UpdateMandatoryFieldsForTheTableFailure: {
      return { ...state, loading: false, hasError: true };
    }
    default: {
      return state;
    }
  }
}
