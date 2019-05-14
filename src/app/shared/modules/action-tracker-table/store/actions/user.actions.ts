import { Action } from '@ngrx/store';
import { User, ErrorMessage, SystemInfo } from '../../models';

export enum UserActionTypes {
  LoadCurrentUser = '[User] Load current User',
  AddCurrentUser = '[User] Add Current User',
  LoadCurrentUserFail = '[User] Load Current User fail'
}

export class LoadCurrentUser implements Action {
  readonly type = UserActionTypes.LoadCurrentUser;
  constructor(public systemInfo: SystemInfo) {}
}

export class AddCurrentUser implements Action {
  readonly type = UserActionTypes.AddCurrentUser;

  constructor(public currentUser: User, public systemInfo: SystemInfo) {}
}

export class LoadCurrentUserFail implements Action {
  readonly type = UserActionTypes.LoadCurrentUserFail;

  constructor(public error: ErrorMessage) {}
}

export type UserActions =
  | LoadCurrentUser
  | AddCurrentUser
  | LoadCurrentUserFail;
