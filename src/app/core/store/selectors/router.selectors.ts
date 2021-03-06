import { createSelector } from '@ngrx/store';
import { getRootState, State } from '../reducers';
import { RouterReducerState } from '@ngrx/router-store';
import * as _ from 'lodash';

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

export const getRouterParams = createSelector(
  getRouteState,
  (routeState: any) => {
    const routeParams =
      routeState && routeState.state ? routeState.state.queryParams : null;

    if (!routeParams) {
      return null;
    }
    const newRouteParams = {};
    _.each(_.keys(routeParams), paramKey => {
      try {
        newRouteParams[paramKey] = {
          id: _.toString(JSON.parse(routeParams[paramKey]))
        };
      } catch (e) {
        newRouteParams[paramKey] = { id: _.toString(routeParams[paramKey]) };
      }
    });
    return newRouteParams;
  }
);
