import { Action } from '@ngrx/store';

export enum GlobalSelectionActionTypes {
  UpsertDataSelections = '[GlobalSelection] Upsert data selections'
}

export class UpsertDataSelectionsAction implements Action {
  readonly type = GlobalSelectionActionTypes.UpsertDataSelections;

  constructor(public dataSelections: any[]) {}
}

export type GlobalSelectionActions = UpsertDataSelectionsAction;
