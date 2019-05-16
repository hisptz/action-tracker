import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { RootCauseAnalysisConfiguration } from '../../models/root-cause-analysis-configuration.model';

export enum RootCauseAnalysisConfigurationActionTypes {
  LoadRootCauseAnalysisConfiguration = '[RootCauseAnalysisConfiguration] Load RootCauseAnalysisConfiguration',
  LoadRootCauseAnalysisConfigurationFail = '[RootCauseAnalysisConfiguration] Load RootCauseAnalysisConfiguration Fail',
  AddRootCauseAnalysisConfiguration = '[RootCauseAnalysisConfiguration] Add RootCauseAnalysisConfiguration',
  UpsertRootCauseAnalysisConfiguration = '[RootCauseAnalysisConfiguration] Upsert RootCauseAnalysisConfiguration',
  AddRootCauseAnalysisConfigurations = '[RootCauseAnalysisConfiguration] Add RootCauseAnalysisConfigurations',
  AddRootCauseAnalysisConfigurationsSuccess = '[RootCauseAnalysisConfiguration] Add RootCauseAnalysisConfigurations Success',
  AddRootCauseAnalysisConfigurationsFail = '[RootCauseAnalysisConfiguration] Add RootCauseAnalysisConfigurations Fail',
  UpsertRootCauseAnalysisConfigurations = '[RootCauseAnalysisConfiguration] Upsert RootCauseAnalysisConfigurations',
  UpdateRootCauseAnalysisConfiguration = '[RootCauseAnalysisConfiguration] Update RootCauseAnalysisConfiguration',
  UpdateRootCauseAnalysisConfigurations = '[RootCauseAnalysisConfiguration] Update RootCauseAnalysisConfigurations',
  DeleteRootCauseAnalysisConfiguration = '[RootCauseAnalysisConfiguration] Delete RootCauseAnalysisConfiguration',
  DeleteRootCauseAnalysisConfigurations = '[RootCauseAnalysisConfiguration] Delete RootCauseAnalysisConfigurations',
  ClearRootCauseAnalysisConfigurations = '[RootCauseAnalysisConfiguration] Clear RootCauseAnalysisConfigurations'
}

export class LoadRootCauseAnalysisConfigurationAction implements Action {
  readonly type =
    RootCauseAnalysisConfigurationActionTypes.LoadRootCauseAnalysisConfiguration;

  constructor(public configurationId: any) {}
}

export class AddRootCauseAnalysisConfiguration implements Action {
  readonly type =
    RootCauseAnalysisConfigurationActionTypes.AddRootCauseAnalysisConfiguration;

  constructor(
    public rootCauseAnalysisConfiguration: RootCauseAnalysisConfiguration
  ) {}
}

export class UpsertRootCauseAnalysisConfiguration implements Action {
  readonly type =
    RootCauseAnalysisConfigurationActionTypes.UpsertRootCauseAnalysisConfiguration;

  constructor(
    public payload: {
      rootCauseAnalysisConfiguration: RootCauseAnalysisConfiguration;
    }
  ) {}
}

export class AddRootCauseAnalysisConfigurationAction implements Action {
  readonly type =
    RootCauseAnalysisConfigurationActionTypes.AddRootCauseAnalysisConfiguration;

  constructor(
    public rootCauseAnalysisConfiguration: RootCauseAnalysisConfiguration
  ) {}
}

export class AddRootCauseAnalysisConfigurationsSuccess implements Action {
  readonly type =
    RootCauseAnalysisConfigurationActionTypes.AddRootCauseAnalysisConfigurationsSuccess;

  constructor(
    public rootCauseAnalysisConfigurations: RootCauseAnalysisConfiguration[]
  ) {}
}

export class AddRootCauseAnalysisConfigurationsFail implements Action {
  readonly type =
    RootCauseAnalysisConfigurationActionTypes.AddRootCauseAnalysisConfigurationsFail;

  constructor(
    public rootCauseAnalysisConfigurations: RootCauseAnalysisConfiguration[],
    public currentRootCauseWidgetId: string
  ) {}
}

export class UpsertRootCauseAnalysisConfigurations implements Action {
  readonly type =
    RootCauseAnalysisConfigurationActionTypes.UpsertRootCauseAnalysisConfigurations;

  constructor(
    public payload: {
      rootCauseAnalysisConfigurations: RootCauseAnalysisConfiguration[];
    }
  ) {}
}

export class UpdateRootCauseAnalysisConfiguration implements Action {
  readonly type =
    RootCauseAnalysisConfigurationActionTypes.UpdateRootCauseAnalysisConfiguration;

  constructor(
    public payload: {
      rootCauseAnalysisConfiguration: Update<RootCauseAnalysisConfiguration>;
    }
  ) {}
}

export class UpdateRootCauseAnalysisConfigurations implements Action {
  readonly type =
    RootCauseAnalysisConfigurationActionTypes.UpdateRootCauseAnalysisConfigurations;

  constructor(
    public payload: {
      rootCauseAnalysisConfigurations: Update<RootCauseAnalysisConfiguration>[];
    }
  ) {}
}

export class DeleteRootCauseAnalysisConfiguration implements Action {
  readonly type =
    RootCauseAnalysisConfigurationActionTypes.DeleteRootCauseAnalysisConfiguration;

  constructor(public payload: { id: string }) {}
}

export class DeleteRootCauseAnalysisConfigurations implements Action {
  readonly type =
    RootCauseAnalysisConfigurationActionTypes.DeleteRootCauseAnalysisConfigurations;

  constructor(public payload: { ids: string[] }) {}
}

export class ClearRootCauseAnalysisConfigurations implements Action {
  readonly type =
    RootCauseAnalysisConfigurationActionTypes.ClearRootCauseAnalysisConfigurations;
}

export class LoadRootCauseAnalysisConfigurationFail implements Action {
  readonly type =
    RootCauseAnalysisConfigurationActionTypes.LoadRootCauseAnalysisConfigurationFail;

  constructor(public error: any) {}
}

export type RootCauseAnalysisConfigurationActions =
  | LoadRootCauseAnalysisConfigurationAction
  | LoadRootCauseAnalysisConfigurationFail
  | AddRootCauseAnalysisConfiguration
  | UpsertRootCauseAnalysisConfiguration
  | AddRootCauseAnalysisConfigurationAction
  | AddRootCauseAnalysisConfigurationsSuccess
  | AddRootCauseAnalysisConfigurationsFail
  | UpsertRootCauseAnalysisConfigurations
  | UpdateRootCauseAnalysisConfiguration
  | UpdateRootCauseAnalysisConfigurations
  | DeleteRootCauseAnalysisConfiguration
  | DeleteRootCauseAnalysisConfigurations
  | ClearRootCauseAnalysisConfigurations;
