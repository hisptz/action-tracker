import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { ActionTrackerConfiguration } from '../../models/action-tracker-configuration.model';
import {
  ColumnSettingsActions,
  ColumnSettingsTypes
} from '../actions/columns-settings.actions';

export interface ColumnSettingsState extends EntityState<any> {
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
  currentConfig: 'ROSaojkGieB'
});

export function columnSettingsReducer(
  state = initialState,
  action: ColumnSettingsActions
): any {
  switch (action.type) {
    case ColumnSettingsTypes.LoadColumnSettings: {
      return {
        ...state,
        loading: true
      };
    }
    case ColumnSettingsTypes.LoadColumnSettingsSuccess: {
      return adapter.addAll(action.payload, state);
    }

    case ColumnSettingsTypes.LoadColumnSettingsFailure: {
      return { ...state, loading: false, hasError: true };
    }

    case ColumnSettingsTypes.SetColumnSettings: {
      return adapter.upsertMany(action.payload, state);
    }

    case ColumnSettingsTypes.SetColumnSettingsSuccess: {
        return adapter.addAll(action.payload, state);
      }

      case ColumnSettingsTypes.SetColumnSettingsFailure: {
        return { ...state, loading: false, hasError: true };
      }

    default: {
      return state;
    }
  }
}
