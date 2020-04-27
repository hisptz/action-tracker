import { Action } from '@ngrx/store';

export enum TableFieldsSettingsTypes {
  CheckMandatorySettingsExist = '[TableFieldsSettings] Check Mandatory Settings Exist',
  CheckMandatorySettingsExistSuccess = '[TableFieldsSettings] Check Mandatory Settings Exist Success',
  CheckMandatorySettingsExistFailure = '[TableFieldsSettings] Check Mandatory Settings Exist Failure',
  SetMandatoryFieldsForTheTable = '[TableFieldsSettings] Set Mandatory Fields in a table',
  SetMandatoryFieldsForTheTableSuccess = '[TableFieldsSettings] Set Mandatory Fields in a table Success',
  SetMandatoryFieldsForTheTableFailure = '[TableFieldsSettings] Set Mandatory Fields in a table Failure',
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

export class SetMandatoryFieldsForTheTableAction implements Action {
  readonly type =
    TableFieldsSettingsTypes.SetMandatoryFieldsForTheTable;
  constructor(public payload: any) {}
}
export class SetMandatoryFieldsForTheTableSuccessAction implements Action {
    readonly type =
      TableFieldsSettingsTypes.SetMandatoryFieldsForTheTableSuccess;
    constructor(public payload: any) {}
  }
  export class SetMandatoryFieldsForTheTableFailureAction implements Action {
    readonly type =
      TableFieldsSettingsTypes.SetMandatoryFieldsForTheTableFailure;
    constructor(public error: any) {}
  }


export type TableFieldsSettingsActions =
  | CheckMandatorySettingsExistAction
  | CheckMandatorySettingsExistSuccessAction
  | CheckMandatorySettingsExistFailureAction
  | SetMandatoryFieldsForTheTableAction
  | SetMandatoryFieldsForTheTableSuccessAction
  | SetMandatoryFieldsForTheTableFailureAction;
