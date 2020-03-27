import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
export enum ColumnSettingsTypes {
  LoadColumnSettings = '[ColumnSettings] Load Column Settings',
  LoadColumnSettingsSuccess = '[ColumnSettings] Load Column Settings Success',
  LoadColumnSettingsFailure = '[ColumnSettings] Load Column Settings Failure',
  SetColumnSettings = '[ColumnSettings] Set Column Settings',
  SetColumnSettingsSuccess = '[ColumnSettings] Set Column Settings Success',
  SetColumnSettingsFailure = '[ColumnSettings] Set Column Settings Failure'
}

export class LoadColumnSettingsAction implements Action {
  readonly type = ColumnSettingsTypes.LoadColumnSettings;
}
export class LoadColumnSettingsSuccessAction implements Action {
  readonly type = ColumnSettingsTypes.LoadColumnSettingsSuccess;
  constructor(public payload: any) {}
}
export class LoadColumnSettingsFailureAction implements Action {
  readonly type = ColumnSettingsTypes.LoadColumnSettingsFailure;
}
export class SetColumnSettingsAction implements Action {
  readonly type = ColumnSettingsTypes.SetColumnSettings;
  constructor(public payload: any) {}
}
export class SetColumnSettingsSuccessAction implements Action {
  readonly type = ColumnSettingsTypes.SetColumnSettingsSuccess;
  constructor(public payload: any) {}
}
export class SetColumnSettingsFailureAction implements Action {
  readonly type = ColumnSettingsTypes.SetColumnSettingsFailure;
  constructor() {}
}

export type ColumnSettingsActions =
  | LoadColumnSettingsAction
  | LoadColumnSettingsSuccessAction
  | LoadColumnSettingsFailureAction
  | SetColumnSettingsAction
  | SetColumnSettingsSuccessAction
  | SetColumnSettingsFailureAction;
