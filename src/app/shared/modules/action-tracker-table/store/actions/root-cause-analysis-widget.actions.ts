import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { RootCauseAnalysisWidget } from '../models/root-cause-analysis-widget.model';

export enum RootCauseAnalysisWidgetActionTypes {
  LoadRootCauseAnalysisWidget = '[RootCauseAnalysisWidget] Load RootCauseAnalysisWidget',
  LoadRootCauseAnalysisWidgetFail = '[RootCauseAnalysisWidget] Load RootCauseAnalysisWidget Fail',
  AddRootCauseAnalysisWidget = '[RootCauseAnalysisWidget] Add RootCauseAnalysisWidget',
  UpsertRootCauseAnalysisWidget = '[RootCauseAnalysisWidget] Upsert RootCauseAnalysisWidget',
  AddRootCauseAnalysisWidgets = '[RootCauseAnalysisWidget] Add RootCauseAnalysisWidgets',
  UpsertRootCauseAnalysisWidgets = '[RootCauseAnalysisWidget] Upsert RootCauseAnalysisWidgets',
  UpdateRootCauseAnalysisWidget = '[RootCauseAnalysisWidget] Update RootCauseAnalysisWidget',
  UpdateRootCauseAnalysisWidgets = '[RootCauseAnalysisWidget] Update RootCauseAnalysisWidgets',
  DeleteRootCauseAnalysisWidget = '[RootCauseAnalysisWidget] Delete RootCauseAnalysisWidget',
  DeleteRootCauseAnalysisWidgets = '[RootCauseAnalysisWidget] Delete RootCauseAnalysisWidgets',
  ClearRootCauseAnalysisWidgets = '[RootCauseAnalysisWidget] Clear RootCauseAnalysisWidgets',
  SetCurrentRootCauseAnalysisWidget = '[RootCauseAnalysisWidget] Set current RootCauseAnalysisWidget'
}

export class LoadRootCauseAnalysisWidget implements Action {
  readonly type =
    RootCauseAnalysisWidgetActionTypes.LoadRootCauseAnalysisWidget;

  constructor(public widgetId: any) {}
}

export class LoadRootCauseAnalysisWidgetFail implements Action {
  readonly type =
    RootCauseAnalysisWidgetActionTypes.LoadRootCauseAnalysisWidgetFail;

  constructor(public error: any) {}
}

export class AddRootCauseAnalysisWidget implements Action {
  readonly type = RootCauseAnalysisWidgetActionTypes.AddRootCauseAnalysisWidget;

  constructor(public rootCauseAnalysisWidget: RootCauseAnalysisWidget) {}
}

export class UpsertRootCauseAnalysisWidget implements Action {
  readonly type =
    RootCauseAnalysisWidgetActionTypes.UpsertRootCauseAnalysisWidget;

  constructor(
    public payload: { rootCauseAnalysisWidget: RootCauseAnalysisWidget }
  ) {}
}

export class AddRootCauseAnalysisWidgets implements Action {
  readonly type =
    RootCauseAnalysisWidgetActionTypes.AddRootCauseAnalysisWidgets;

  constructor(
    public payload: { rootCauseAnalysisWidgets: RootCauseAnalysisWidget[] }
  ) {}
}

export class UpsertRootCauseAnalysisWidgets implements Action {
  readonly type =
    RootCauseAnalysisWidgetActionTypes.UpsertRootCauseAnalysisWidgets;

  constructor(
    public payload: { rootCauseAnalysisWidgets: RootCauseAnalysisWidget[] }
  ) {}
}

export class UpdateRootCauseAnalysisWidget implements Action {
  readonly type =
    RootCauseAnalysisWidgetActionTypes.UpdateRootCauseAnalysisWidget;

  constructor(
    public payload: { rootCauseAnalysisWidget: Update<RootCauseAnalysisWidget> }
  ) {}
}

export class UpdateRootCauseAnalysisWidgets implements Action {
  readonly type =
    RootCauseAnalysisWidgetActionTypes.UpdateRootCauseAnalysisWidgets;

  constructor(
    public payload: {
      rootCauseAnalysisWidgets: Update<RootCauseAnalysisWidget>[];
    }
  ) {}
}

export class DeleteRootCauseAnalysisWidget implements Action {
  readonly type =
    RootCauseAnalysisWidgetActionTypes.DeleteRootCauseAnalysisWidget;

  constructor(public payload: { id: string }) {}
}

export class DeleteRootCauseAnalysisWidgets implements Action {
  readonly type =
    RootCauseAnalysisWidgetActionTypes.DeleteRootCauseAnalysisWidgets;

  constructor(public payload: { ids: string[] }) {}
}

export class ClearRootCauseAnalysisWidgets implements Action {
  readonly type =
    RootCauseAnalysisWidgetActionTypes.ClearRootCauseAnalysisWidgets;
}

export class SetCurrentRootCauseAnalysisWidget implements Action {
  readonly type =
    RootCauseAnalysisWidgetActionTypes.SetCurrentRootCauseAnalysisWidget;
  constructor(public currentWidgetId: string) {}
}

export type RootCauseAnalysisWidgetActions =
  | LoadRootCauseAnalysisWidget
  | AddRootCauseAnalysisWidget
  | UpsertRootCauseAnalysisWidget
  | AddRootCauseAnalysisWidgets
  | UpsertRootCauseAnalysisWidgets
  | UpdateRootCauseAnalysisWidget
  | UpdateRootCauseAnalysisWidgets
  | DeleteRootCauseAnalysisWidget
  | DeleteRootCauseAnalysisWidgets
  | LoadRootCauseAnalysisWidgetFail
  | ClearRootCauseAnalysisWidgets
  | SetCurrentRootCauseAnalysisWidget;
