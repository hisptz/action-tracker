import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { LegendSet } from '../../models/legend-set';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum LegendSetActionTypes {
  LoadLegendSets = '[LegendSet] Load LegendSets',
  LoadLegendSetSuccess = '[LegendSet] Load LegendSet Success',
  LoadLegendSetFail = '[LegendSet] Load LegendSet Fail',
  UpsetLagendSets = '[LegendSet] Add or update legendSets'
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */
export class LoadLegendSets implements Action {
  readonly type = LegendSetActionTypes.LoadLegendSets;
}

export class LoadLegendSetSuccess implements Action {
  readonly type = LegendSetActionTypes.LoadLegendSetSuccess;
  constructor(public payload: LegendSet[]) {}
}

export class LoadLegendSetFail implements Action {
  readonly type = LegendSetActionTypes.LoadLegendSetFail;
  constructor(public error: any) {}
}

export class UpsetLagendSets implements Action {
  readonly type = LegendSetActionTypes.UpsetLagendSets;
  constructor(public payload: { legendSets: LegendSet[] }) {}
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type LegendSetActions =
  | LoadLegendSets
  | LoadLegendSetSuccess
  | LoadLegendSetFail
  | UpsetLagendSets;
