import { createSelector } from '@ngrx/store';
import { getRootState, State } from '../reducers';
import { RouterReducerState } from '@ngrx/router-store';

export const getRouteState = createSelector(
  getRootState,
  (state: State) => state.route
);

export const getRouteUrl = (stripParams?: boolean) =>
  createSelector(
    getRouteState,
    (routeState: RouterReducerState) => {
      const routeUrl =
        routeState && routeState.state ? routeState.state.url : '';
      return (routeUrl || '').split('?')[0];
    }
  );
