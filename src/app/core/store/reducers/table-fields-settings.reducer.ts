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
  errorType?: string;
}
export const adapter: EntityAdapter<any> = createEntityAdapter<any>();
export const initialState: any = adapter.getInitialState({
  loading: false,
  loaded: false,
  hasError: false,
  error: null,
  currentConfig: 'ROSaojkGieB',
  errorType: null
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
      return adapter.addMany(action.payload, state);
    }

    case TableFieldsSettingsTypes.CheckMandatorySettingsExistFailure: {
      return { ...state, loading: false, hasError: true, error: action.error, errorType: 'check' };
    }
    case TableFieldsSettingsTypes.LoadMandatoryFieldsForTheTable: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }
    case TableFieldsSettingsTypes.LoadMandatoryFieldsForTheTableSuccess: {
      return adapter.upsertMany(
       action.payload,
       {...state, loaded: true, loading: false}
      );
    }
    case TableFieldsSettingsTypes.LoadMandatoryFieldsForTheTableFailure: {
      return { ...state, loading: false, hasError: true, error: action.error, errorType: 'check' };
    }

    case TableFieldsSettingsTypes.CreateMandatoryFieldsForTheTable: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }
    case TableFieldsSettingsTypes.CreateMandatoryFieldsForTheTableSuccess: {
      return adapter.setAll(
      action.payload,
      {...state, loaded: true, loading: false}
      );
    }
    case TableFieldsSettingsTypes.CreateMandatoryFieldsForTheTableFailure: {
      return { ...state, loading: false, hasError: true, error: action.error, errorType: 'create' };
    }
    case TableFieldsSettingsTypes.UpdateMandatoryFieldsForTheTable: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }
    case TableFieldsSettingsTypes.UpdateMandatoryFieldsForTheTableSuccess: {
      return adapter.upsertMany(
       action.payload,
        {...state, loaded: true, loading: false}
      );
    }
    case TableFieldsSettingsTypes.UpdateMandatoryFieldsForTheTableFailure: {
      return { ...state, loading: false, hasError: true, error: action.error, errorType: 'update' };
    }
    default: {
      return state;
    }
  }
}
