import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { RootCauseAnalysisData } from '../../models/root-cause-analysis-data.model';
import * as fromRootCauseAnalysisConfiguration from '../../models/root-cause-analysis-configuration.model';

export enum RootCauseAnalysisDataActionTypes {
  LoadRootCauseAnalysisDatas = '[RootCauseAnalysisData] Load RootCauseAnalysisDatas',
  LoadRootCauseAnalysisDatasFail = '[RootCauseAnalysisData] Load RootCauseAnalysisDatas fail',
  AddRootCauseAnalysisData = '[RootCauseAnalysisData] Add RootCauseAnalysisData',
  UpsertRootCauseAnalysisData = '[RootCauseAnalysisData] Upsert RootCauseAnalysisData',
  AddRootCauseAnalysisDatas = '[RootCauseAnalysisData] Add RootCauseAnalysisDatas',
  UpsertRootCauseAnalysisDatas = '[RootCauseAnalysisData] Upsert RootCauseAnalysisDatas',
  UpdateRootCauseAnalysisData = '[RootCauseAnalysisData] Update RootCauseAnalysisData',
  UpdateRootCauseAnalysisDataFail = '[RootCauseAnalysisData] Update RootCauseAnalysisDataFail',
  UpdateRootCauseAnalysisDataSuccess = '[RootCauseAnalysisData] Update RootCauseAnalysisDataSuccess',
  UpdateRootCauseAnalysisDatas = '[RootCauseAnalysisData] Update RootCauseAnalysisDatas',
  DeleteRootCauseAnalysisData = '[RootCauseAnalysisData] Delete RootCauseAnalysisData',
  DeleteRootCauseAnalysisDataSuccess = '[RootCauseAnalysisData] Delete RootCauseAnalysisData Success',
  DeleteRootCauseAnalysisDataFail = '[RootCauseAnalysisData] Delete RootCauseAnalysisData Fail',
  DeleteRootCauseAnalysisDatas = '[RootCauseAnalysisData] Delete RootCauseAnalysisDatas',
  ClearRootCauseAnalysisDatas = '[RootCauseAnalysisData] Clear RootCauseAnalysisDatas',
  CreateRootCauseAnalysisData = '[RootCauseAnalysisData] Create RootCauseAnalysisData',
  CreateRootCauseAnalysisDataSuccess = '[RootCauseAnalysisData] Create RootCauseAnalysisData Success',
  CreateRootCauseAnalysisDataFail = '[RootCauseAnalysisData] Create RootCauseAnalysisData Fail',
  SaveRootCauseAnalysisData = '[RootCauseAnalysisData] Save RootCauseAnalysisData',
  SaveRootCauseAnalysisDataSuccess = '[RootCauseAnalysisData] Save RootCauseAnalysisData Success',
  SaveRootCauseAnalysisDataFail = '[RootCauseAnalysisData] Save RootCauseAnalysisData Fail',
  ResetRootCauseAnalysisData = '[RootCauseAnalysisData] Reset RootCauseAnalysisData'
}

export class ResetRootCauseAnalysisData implements Action {
  readonly type = RootCauseAnalysisDataActionTypes.ResetRootCauseAnalysisData;
  constructor(public notification: any) {}
}

export class LoadRootCauseAnalysisDatas implements Action {
  readonly type = RootCauseAnalysisDataActionTypes.LoadRootCauseAnalysisDatas;

  constructor(public dataParams: any) {}
}

export class LoadRootCauseAnalysisDatasFail implements Action {
  readonly type =
    RootCauseAnalysisDataActionTypes.LoadRootCauseAnalysisDatasFail;

  constructor(public error: any) {}
}

export class AddRootCauseAnalysisData implements Action {
  readonly type = RootCauseAnalysisDataActionTypes.AddRootCauseAnalysisData;

  constructor(public rootCauseAnalysisData: RootCauseAnalysisData) {}
}

export class CreateRootCauseAnalysisData implements Action {
  readonly type = RootCauseAnalysisDataActionTypes.CreateRootCauseAnalysisData;

  constructor(public rootCauseAnalysisData: RootCauseAnalysisData) {}
}

export class CreateRootCauseAnalysisDataSuccess implements Action {
  readonly type =
    RootCauseAnalysisDataActionTypes.CreateRootCauseAnalysisDataSuccess;

  constructor(public rootCauseAnalysisData: RootCauseAnalysisData, state) {}
}

export class CreateRootCauseAnalysisDataFail implements Action {
  readonly type =
    RootCauseAnalysisDataActionTypes.CreateRootCauseAnalysisDataFail;

  constructor(
    public rootCauseAnalysisData: RootCauseAnalysisData,
    public error: any
  ) {}
}

export class SaveRootCauseAnalysisData implements Action {
  readonly type = RootCauseAnalysisDataActionTypes.SaveRootCauseAnalysisData;

  constructor(public rootCauseAnalysisData: RootCauseAnalysisData) {}
}

export class SaveRootCauseAnalysisDataSuccess implements Action {
  readonly type =
    RootCauseAnalysisDataActionTypes.SaveRootCauseAnalysisDataSuccess;

  constructor(public rootCauseAnalysisData: RootCauseAnalysisData, state) {}
}

export class SaveRootCauseAnalysisDataFail implements Action {
  readonly type =
    RootCauseAnalysisDataActionTypes.SaveRootCauseAnalysisDataFail;

  constructor(
    public rootCauseAnalysisData: RootCauseAnalysisData,
    public error: any
  ) {}
}

export class UpsertRootCauseAnalysisData implements Action {
  readonly type = RootCauseAnalysisDataActionTypes.UpsertRootCauseAnalysisData;

  constructor(
    public payload: { rootCauseAnalysisData: RootCauseAnalysisData }
  ) {}
}

export class AddRootCauseAnalysisDatas implements Action {
  readonly type = RootCauseAnalysisDataActionTypes.AddRootCauseAnalysisDatas;

  constructor(public rootCauseAnalysisDatas: RootCauseAnalysisData[]) {}
}

export class UpsertRootCauseAnalysisDatas implements Action {
  readonly type = RootCauseAnalysisDataActionTypes.UpsertRootCauseAnalysisDatas;

  constructor(
    public payload: { rootCauseAnalysisDatas: RootCauseAnalysisData[] }
  ) {}
}

export class UpdateRootCauseAnalysisDataSuccess implements Action {
  readonly type =
    RootCauseAnalysisDataActionTypes.UpdateRootCauseAnalysisDataSuccess;

  constructor(public rootCauseAnalysisData: RootCauseAnalysisData) {}
}

export class UpdateRootCauseAnalysisData implements Action {
  readonly type = RootCauseAnalysisDataActionTypes.UpdateRootCauseAnalysisData;

  constructor(public rootCauseAnalysisData: RootCauseAnalysisData) {}
}

export class UpdateRootCauseAnalysisDataFail implements Action {
  readonly type =
    RootCauseAnalysisDataActionTypes.UpdateRootCauseAnalysisDataFail;

  constructor(public error) {}
}

export class UpdateRootCauseAnalysisDatas implements Action {
  readonly type = RootCauseAnalysisDataActionTypes.UpdateRootCauseAnalysisDatas;

  constructor(
    public payload: { rootCauseAnalysisDatas: Update<RootCauseAnalysisData>[] }
  ) {}
}

export class DeleteRootCauseAnalysisData implements Action {
  readonly type = RootCauseAnalysisDataActionTypes.DeleteRootCauseAnalysisData;

  constructor(public rootCauseAnalysisData: RootCauseAnalysisData) {}
}

export class DeleteRootCauseAnalysisDataSuccess implements Action {
  readonly type =
    RootCauseAnalysisDataActionTypes.DeleteRootCauseAnalysisDataSuccess;

  constructor(public id: string) {}
}

export class DeleteRootCauseAnalysisDataFail implements Action {
  readonly type =
    RootCauseAnalysisDataActionTypes.DeleteRootCauseAnalysisDataFail;
  constructor(
    public rootCauseAnalysisData: RootCauseAnalysisData,
    public error: any
  ) {}
}

export class DeleteRootCauseAnalysisDatas implements Action {
  readonly type = RootCauseAnalysisDataActionTypes.DeleteRootCauseAnalysisDatas;

  constructor(public payload: { ids: string[] }) {}
}

export class ClearRootCauseAnalysisDatas implements Action {
  readonly type = RootCauseAnalysisDataActionTypes.ClearRootCauseAnalysisDatas;
}

export type RootCauseAnalysisDataActions =
  | LoadRootCauseAnalysisDatas
  | AddRootCauseAnalysisData
  | SaveRootCauseAnalysisData
  | SaveRootCauseAnalysisDataSuccess
  | SaveRootCauseAnalysisDataFail
  | UpsertRootCauseAnalysisData
  | AddRootCauseAnalysisDatas
  | CreateRootCauseAnalysisData
  | CreateRootCauseAnalysisDataFail
  | CreateRootCauseAnalysisDataSuccess
  | UpsertRootCauseAnalysisDatas
  | UpdateRootCauseAnalysisData
  | UpdateRootCauseAnalysisDataSuccess
  | UpdateRootCauseAnalysisDataFail
  | UpdateRootCauseAnalysisDatas
  | DeleteRootCauseAnalysisData
  | DeleteRootCauseAnalysisDatas
  | ClearRootCauseAnalysisDatas
  | ResetRootCauseAnalysisData
  | LoadRootCauseAnalysisDatasFail;
