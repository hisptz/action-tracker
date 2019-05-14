import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';

import * as fromUser from './user.reducer';
import * as fromSystemInfo from './system-info.reducer';
import { RouterReducerState, routerReducer } from '@ngrx/router-store';
import { environment } from 'src/environments/environment';

export interface State {
  /**
   * User state
   */
  user: fromUser.State;

  /**
   * System info state
   */
  systemInfo: fromSystemInfo.State;

  /**
   * Router state
   */
  route: RouterReducerState;
}

export const reducers: ActionReducerMap<State> = {
  user: fromUser.reducer,
  systemInfo: fromSystemInfo.reducer,
  route: routerReducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];

/**
 * Root state selector
 */
export const getRootState = (state: State) => state;
