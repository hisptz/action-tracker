import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { ActionTrackerData } from '../../models/action-tracker-data.model';

export enum ActionTrackerDataActionTypes {
  LoadActionTrackerDatas = '[ActionTrackerData] Load ActionTrackerDatas',
  AddActionTrackerData = '[ActionTrackerData] Add ActionTrackerData',
  UpsertActionTrackerData = '[ActionTrackerData] Upsert ActionTrackerData',
  AddActionTrackerDatas = '[ActionTrackerData] Add ActionTrackerDatas',
  UpsertActionTrackerDatas = '[ActionTrackerData] Upsert ActionTrackerDatas',
  UpdateActionTrackerData = '[ActionTrackerData] Update ActionTrackerData',
  UpdateActionTrackerDatas = '[ActionTrackerData] Update ActionTrackerDatas',
  DeleteActionTrackerData = '[ActionTrackerData] Delete ActionTrackerData',
  DeleteActionTrackerDatas = '[ActionTrackerData] Delete ActionTrackerDatas',
  ClearActionTrackerDatas = '[ActionTrackerData] Clear ActionTrackerDatas'
}

export class LoadActionTrackerDatas implements Action {
  readonly type = ActionTrackerDataActionTypes.LoadActionTrackerDatas;

  constructor(public payload: { actionTrackerDatas: ActionTrackerData[] }) {}
}

export class AddActionTrackerData implements Action {
  readonly type = ActionTrackerDataActionTypes.AddActionTrackerData;

  constructor(public payload: { actionTrackerData: ActionTrackerData }) {}
}

export class UpsertActionTrackerData implements Action {
  readonly type = ActionTrackerDataActionTypes.UpsertActionTrackerData;

  constructor(public payload: { actionTrackerData: ActionTrackerData }) {}
}

export class AddActionTrackerDatas implements Action {
  readonly type = ActionTrackerDataActionTypes.AddActionTrackerDatas;

  constructor(public payload: { actionTrackerDatas: ActionTrackerData[] }) {}
}

export class UpsertActionTrackerDatas implements Action {
  readonly type = ActionTrackerDataActionTypes.UpsertActionTrackerDatas;

  constructor(public payload: { actionTrackerDatas: ActionTrackerData[] }) {}
}

export class UpdateActionTrackerData implements Action {
  readonly type = ActionTrackerDataActionTypes.UpdateActionTrackerData;

  constructor(
    public payload: { actionTrackerData: Update<ActionTrackerData> }
  ) {}
}

export class UpdateActionTrackerDatas implements Action {
  readonly type = ActionTrackerDataActionTypes.UpdateActionTrackerDatas;

  constructor(
    public payload: { actionTrackerDatas: Update<ActionTrackerData>[] }
  ) {}
}

export class DeleteActionTrackerData implements Action {
  readonly type = ActionTrackerDataActionTypes.DeleteActionTrackerData;

  constructor(public payload: { id: string }) {}
}

export class DeleteActionTrackerDatas implements Action {
  readonly type = ActionTrackerDataActionTypes.DeleteActionTrackerDatas;

  constructor(public payload: { ids: string[] }) {}
}

export class ClearActionTrackerDatas implements Action {
  readonly type = ActionTrackerDataActionTypes.ClearActionTrackerDatas;
}

export type ActionTrackerDataActions =
  | LoadActionTrackerDatas
  | AddActionTrackerData
  | UpsertActionTrackerData
  | AddActionTrackerDatas
  | UpsertActionTrackerDatas
  | UpdateActionTrackerData
  | UpdateActionTrackerDatas
  | DeleteActionTrackerData
  | DeleteActionTrackerDatas
  | ClearActionTrackerDatas;
