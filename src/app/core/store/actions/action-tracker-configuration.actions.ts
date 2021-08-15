import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { ActionTrackerConfiguration } from '../../models/action-tracker-configuration.model';

export enum ActionTrackerConfigurationActionTypes {
  LoadActionTrackerConfiguration = '[ActionTrackerConfiguration] Load ActionTrackerConfiguration',
  LoadActionTrackerConfigurationSuccess = '[ActionTrackerConfiguration] Load ActionTrackerConfiguration Success',
  LoadActionTrackerConfigurationFail = '[ActionTrackerConfiguration] Load ActionTrackerConfiguration Fail',
  AddActionTrackerConfiguration = '[ActionTrackerConfiguration] Add ActionTrackerConfiguration',
  UpsertActionTrackerConfiguration = '[ActionTrackerConfiguration] Upsert ActionTrackerConfiguration',
  AddActionTrackerConfigurations = '[ActionTrackerConfiguration] Add ActionTrackerConfigurations',
  UpsertActionTrackerConfigurations = '[ActionTrackerConfiguration] Upsert ActionTrackerConfigurations',
  UpdateActionTrackerConfiguration = '[ActionTrackerConfiguration] Update ActionTrackerConfiguration',
  UpdateActionTrackerConfigurations = '[ActionTrackerConfiguration] Update ActionTrackerConfigurations',
  UploadActionTrackerConfiguration = '[ActionTrackerConfiguration] Upload ActionTrackerConfiguration',
  UploadActionTrackerConfigurationFail = '[ActionTrackerConfiguration] Upload ActionTrackerConfiguration Fail',
  DeleteActionTrackerConfiguration = '[ActionTrackerConfiguration] Delete ActionTrackerConfiguration',
  DeleteActionTrackerConfigurations = '[ActionTrackerConfiguration] Delete ActionTrackerConfigurations',
  ClearActionTrackerConfigurations = '[ActionTrackerConfiguration] Clear ActionTrackerConfigurations',
}

export class LoadActionTrackerConfigurationAction implements Action {
  readonly type =
    ActionTrackerConfigurationActionTypes.LoadActionTrackerConfiguration;
}

export class LoadActionTrackerConfigurationFail implements Action {
  readonly type =
    ActionTrackerConfigurationActionTypes.LoadActionTrackerConfigurationFail;
  constructor(public error: any) {}
}

export class AddActionTrackerConfigurationAction implements Action {
  readonly type =
    ActionTrackerConfigurationActionTypes.AddActionTrackerConfiguration;
  constructor(public actionTrackerConfig: any) {}
}

export class UpsertActionTrackerConfiguration implements Action {
  readonly type =
    ActionTrackerConfigurationActionTypes.UpsertActionTrackerConfiguration;

  constructor(
    public payload: { actionTrackerConfiguration: ActionTrackerConfiguration }
  ) {}
}

export class AddActionTrackerConfigurations implements Action {
  readonly type =
    ActionTrackerConfigurationActionTypes.AddActionTrackerConfigurations;

  constructor(
    public payload: {
      actionTrackerConfigurations: ActionTrackerConfiguration[];
    }
  ) {}
}

export class UpsertActionTrackerConfigurations implements Action {
  readonly type =
    ActionTrackerConfigurationActionTypes.UpsertActionTrackerConfigurations;

  constructor(
    public payload: {
      actionTrackerConfigurations: ActionTrackerConfiguration[];
    }
  ) {}
}

export class UpdateActionTrackerConfiguration implements Action {
  readonly type =
    ActionTrackerConfigurationActionTypes.UpdateActionTrackerConfiguration;

  constructor(
    public payload: {
      actionTrackerConfiguration: Update<ActionTrackerConfiguration>;
    }
  ) {}
}
export class UploadActionTrackerConfiguration implements Action {
  readonly type =
    ActionTrackerConfigurationActionTypes.UploadActionTrackerConfiguration;

  constructor(public defaultActionTrackerProgram) {}
}

export class UploadActionTrackerConfigurationFail implements Action {
  readonly type =
    ActionTrackerConfigurationActionTypes.UploadActionTrackerConfigurationFail;
  constructor(public error: any) {}
}

export class UpdateActionTrackerConfigurations implements Action {
  readonly type =
    ActionTrackerConfigurationActionTypes.UpdateActionTrackerConfigurations;

  constructor(
    public payload: {
      actionTrackerConfigurations: Update<ActionTrackerConfiguration>[];
    }
  ) {}
}

export class DeleteActionTrackerConfiguration implements Action {
  readonly type =
    ActionTrackerConfigurationActionTypes.DeleteActionTrackerConfiguration;

  constructor(public payload: { id: string }) {}
}

export class DeleteActionTrackerConfigurations implements Action {
  readonly type =
    ActionTrackerConfigurationActionTypes.DeleteActionTrackerConfigurations;

  constructor(public payload: { ids: string[] }) {}
}

export class ClearActionTrackerConfigurations implements Action {
  readonly type =
    ActionTrackerConfigurationActionTypes.ClearActionTrackerConfigurations;
}

export type ActionTrackerConfigurationActions =
  | LoadActionTrackerConfigurationAction
  | LoadActionTrackerConfigurationFail
  | AddActionTrackerConfigurationAction
  | UpsertActionTrackerConfiguration
  | AddActionTrackerConfigurations
  | UpsertActionTrackerConfigurations
  | UpdateActionTrackerConfiguration
  | UpdateActionTrackerConfigurations
  | UploadActionTrackerConfiguration
  | UploadActionTrackerConfigurationFail
  | DeleteActionTrackerConfiguration
  | DeleteActionTrackerConfigurations
  | ClearActionTrackerConfigurations;
