import { Action } from '@ngrx/store';

export enum TableFieldsSettingsTypes {
  CheckMandatorySettingsExist = '[TableFieldsSettings] Check Mandatory Settings Exist',
  CheckMandatorySettingsExistSuccess = '[TableFieldsSettings] Check Mandatory Settings Exist Success',
  CheckMandatorySettingsExistFailure = '[TableFieldsSettings] Check Mandatory Settings Exist Failure',
  LoadMandatoryFieldsForTheTable = '[TableFieldsSettings] Load Mandatory Fields in a table',
  LoadMandatoryFieldsForTheTableSuccess = '[TableFieldsSettings] Load Mandatory Fields in a table Success',
  LoadMandatoryFieldsForTheTableFailure = '[TableFieldsSettings] Load Mandatory Fields in a table Failure',
  CreateMandatoryFieldsForTheTable = '[TableFieldsSettings] Create Mandatory Fields in a table',
  CreateMandatoryFieldsForTheTableSuccess = '[TableFieldsSettings] Create Mandatory Fields in a table Success',
  CreateMandatoryFieldsForTheTableFailure = '[TableFieldsSettings] Create Mandatory Fields in a table Failure',
  UpdateMandatoryFieldsForTheTable = '[TableFieldsSettings] Update Mandatory Fields in a table',
  UpdateMandatoryFieldsForTheTableSuccess = '[TableFieldsSettings] Update Mandatory Fields in a table Success',
  UpdateMandatoryFieldsForTheTableFailure = '[TableFieldsSettings] Update Mandatory Fields in a table Failure',
}



export class CheckMandatorySettingsExistAction implements Action {
  readonly type = TableFieldsSettingsTypes.CheckMandatorySettingsExist;
}
export class CheckMandatorySettingsExistSuccessAction implements Action {
    readonly type = TableFieldsSettingsTypes.CheckMandatorySettingsExistSuccess;
    constructor(public payload: any) {}
  }
  export class CheckMandatorySettingsExistFailureAction implements Action {
    readonly type = TableFieldsSettingsTypes.CheckMandatorySettingsExistFailure;
    constructor(public error: any) {}
  }
  export class LoadMandatoryFieldsForTheTableAction implements Action {
    readonly type =
      TableFieldsSettingsTypes.LoadMandatoryFieldsForTheTable;
  }
  export class LoadMandatoryFieldsForTheTableSuccessAction implements Action {
      readonly type =
        TableFieldsSettingsTypes.LoadMandatoryFieldsForTheTableSuccess;
      constructor(public payload: any) {}
    }
    export class LoadMandatoryFieldsForTheTableFailureAction implements Action {
      readonly type =
        TableFieldsSettingsTypes.LoadMandatoryFieldsForTheTableFailure;
      constructor(public error: any) {}
    }

export class CreateMandatoryFieldsForTheTableAction implements Action {
  readonly type =
    TableFieldsSettingsTypes.CreateMandatoryFieldsForTheTable;
  constructor(public payload: any) {}
}
export class CreateMandatoryFieldsForTheTableSuccessAction implements Action {
    readonly type =
      TableFieldsSettingsTypes.CreateMandatoryFieldsForTheTableSuccess;
    constructor(public payload: any) {}
  }
  export class CreateMandatoryFieldsForTheTableFailureAction implements Action {
    readonly type =
      TableFieldsSettingsTypes.CreateMandatoryFieldsForTheTableFailure;
    constructor(public error: any) {}
  }
  export class UpdateMandatoryFieldsForTheTableAction implements Action {
    readonly type =
      TableFieldsSettingsTypes.UpdateMandatoryFieldsForTheTable;
    constructor(public payload: any) {}
  }
  export class UpdateMandatoryFieldsForTheTableSuccessAction implements Action {
      readonly type =
        TableFieldsSettingsTypes.UpdateMandatoryFieldsForTheTableSuccess;
      constructor(public payload: any) {}
    }
    export class UpdateMandatoryFieldsForTheTableFailureAction implements Action {
      readonly type =
        TableFieldsSettingsTypes.UpdateMandatoryFieldsForTheTableFailure;
      constructor(public error: any) {}
    }


export type TableFieldsSettingsActions =
  | CheckMandatorySettingsExistAction
  | CheckMandatorySettingsExistSuccessAction
  | CheckMandatorySettingsExistFailureAction
  | LoadMandatoryFieldsForTheTableAction
  | LoadMandatoryFieldsForTheTableSuccessAction
  | LoadMandatoryFieldsForTheTableFailureAction
  | CreateMandatoryFieldsForTheTableAction
  | CreateMandatoryFieldsForTheTableSuccessAction
  | CreateMandatoryFieldsForTheTableFailureAction
  | UpdateMandatoryFieldsForTheTableAction
  | UpdateMandatoryFieldsForTheTableSuccessAction
  | UpdateMandatoryFieldsForTheTableFailureAction;
