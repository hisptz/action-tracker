import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { ActionTrackerData } from '../../models/action-tracker-data.model';

export enum ActionTrackerDataActionTypes {
  LoadActionTrackerDatas = '[ActionTrackerData] Load ActionTrackerDatas',
  LoadActionTrackerDatasFail = '[ActionTrackerData] Load ActionTrackerData fail',
  AddActionTrackerData = '[ActionTrackerData] Add ActionTrackerData',
  AddActionTrackerDataFail = '[ActionTrackerData] Add ActionTrackerData Fail',
  AddActionTrackerDataSuccess = '[ActionTrackerData] Add ActionTrackerData Success',
  UpsertActionTrackerData = '[ActionTrackerData] Upsert ActionTrackerData',
  AddActionTrackerDatas = '[ActionTrackerData] Add ActionTrackerDatas',
  UpsertActionTrackerDatas = '[ActionTrackerData] Upsert ActionTrackerDatas',
  UpdateActionTrackerData = '[ActionTrackerData] Update ActionTrackerData',
  UpdateActionTrackerDatas = '[ActionTrackerData] Update ActionTrackerDatas',
  DeleteActionTrackerData = '[ActionTrackerData] Delete ActionTrackerData',
  DeleteActionTrackerDataSuccess = '[ActionTrackerData] Delete ActionTrackerData Success',
  DeleteActionTrackerDataFail = '[ActionTrackerData] Delete ActionTrackerData Fail',
  DeleteActionTrackerDatas = '[ActionTrackerData] Delete ActionTrackerDatas',
  ClearActionTrackerDatas = '[ActionTrackerData] Clear ActionTrackerDatas',
  CancelActionTrackerData = '[ActionTrackerData] Cancel ActionTrackerData',
  CancelActionTrackerDataSuccess = '[ActionTrackerData] Cancel ActionTrackerData Success',
  CancelActionTrackerDataFail = '[ActionTrackerData] Cancel ActionTrackerData Fail',
  SaveActionTrackerData = '[ActionTrackerData] Save ActionTrackerData',
  SaveActionTrackerDataSuccess = '[ActionTrackerData] Save ActionTrackerData Success',
  SaveActionTrackerDataFail = '[ActionTrackerData] Save ActionTrackerData Fail'
}

export class LoadActionTrackerDatas implements Action {
  readonly type = ActionTrackerDataActionTypes.LoadActionTrackerDatas;
  constructor(public dataParams: any) {}
}

export class LoadActionTrackerDatasFail implements Action {
  readonly type = ActionTrackerDataActionTypes.LoadActionTrackerDatasFail;

  constructor(public error: any) {}
}

export class AddActionTrackerData implements Action {
  readonly type = ActionTrackerDataActionTypes.AddActionTrackerData;

  constructor(public actionTrackerData: ActionTrackerData) {}
}

export class AddActionTrackerDataFail implements Action {
  readonly type = ActionTrackerDataActionTypes.AddActionTrackerDataFail;

  constructor(public actionTrackerData: ActionTrackerData) {}
}

export class AddActionTrackerDataSuccess implements Action {
  readonly type = ActionTrackerDataActionTypes.AddActionTrackerDataSuccess;

  constructor(public actionTrackerData: ActionTrackerData) {}
}
export class CancelActionTrackerData implements Action {
  readonly type = ActionTrackerDataActionTypes.CancelActionTrackerData;

  constructor(public actionTrackerData: any) {}
}

export class CancelActionTrackerDataFail implements Action {
  readonly type = ActionTrackerDataActionTypes.CancelActionTrackerDataFail;

  constructor(public actionTrackerData: ActionTrackerData) {}
}

export class CancelActionTrackerDataSuccess implements Action {
  readonly type = ActionTrackerDataActionTypes.CancelActionTrackerDataSuccess;

  constructor(public actionTrackerData: ActionTrackerData) {}
}

export class UpsertActionTrackerData implements Action {
  readonly type = ActionTrackerDataActionTypes.UpsertActionTrackerData;

  constructor(public payload: { actionTrackerData: ActionTrackerData }) {}
}

export class AddActionTrackerDatas implements Action {
  readonly type = ActionTrackerDataActionTypes.AddActionTrackerDatas;

  constructor(public actionTrackerDatas: ActionTrackerData[]) {}
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

  constructor(
    public actionTrackerData: any,
    public actionTrackerDataId?: string
  ) {}
}

export class DeleteActionTrackerDataSuccess implements Action {
  readonly type = ActionTrackerDataActionTypes.DeleteActionTrackerDataSuccess;

  constructor(public id: string) {}
}

export class DeleteActionTrackerDataFail implements Action {
  readonly type = ActionTrackerDataActionTypes.DeleteActionTrackerDataFail;
  constructor(public actionTrackerData: ActionTrackerData, public error: any) {}
}

export class DeleteActionTrackerDatas implements Action {
  readonly type = ActionTrackerDataActionTypes.DeleteActionTrackerDatas;

  constructor(public payload: { ids: string[] }) {}
}

export class ClearActionTrackerDatas implements Action {
  readonly type = ActionTrackerDataActionTypes.ClearActionTrackerDatas;
}

export class SaveActionTrackerData implements Action {
  readonly type = ActionTrackerDataActionTypes.SaveActionTrackerData;

  constructor(
    public actionTrackerData: any,
    public actionTrackerDataId?: string
  ) {}
}

export class SaveActionTrackerDataSuccess implements Action {
  readonly type = ActionTrackerDataActionTypes.SaveActionTrackerDataSuccess;

  constructor(public actionTrackerData: ActionTrackerData, public state: any) {}
}

export class SaveActionTrackerDataFail implements Action {
  readonly type = ActionTrackerDataActionTypes.SaveActionTrackerDataFail;

  constructor(public error: any) {}
}

export type ActionTrackerDataActions =
  | LoadActionTrackerDatas
  | LoadActionTrackerDatasFail
  | AddActionTrackerData
  | AddActionTrackerDataSuccess
  | AddActionTrackerDataFail
  | CancelActionTrackerData
  | CancelActionTrackerDataSuccess
  | CancelActionTrackerDataFail
  | UpsertActionTrackerData
  | AddActionTrackerDatas
  | UpsertActionTrackerDatas
  | UpdateActionTrackerData
  | UpdateActionTrackerDatas
  | DeleteActionTrackerData
  | DeleteActionTrackerDataFail
  | DeleteActionTrackerDataSuccess
  | DeleteActionTrackerDatas
  | ClearActionTrackerDatas
  | SaveActionTrackerData
  | SaveActionTrackerDataSuccess
  | SaveActionTrackerDataFail;
