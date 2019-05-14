import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';

import * as fromRouterSelector from '../selectors';
import * as fromRootCauseAnalysisWidgetActions from '../actions/root-cause-analysis-widget.actions';
import { RootCauseAnalysisWidget } from '../models/root-cause-analysis-widget.model';
import { RootCauseAnalysisWidgetService } from '../../services';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { LoadRootCauseAnalysisDatas } from '../actions/root-cause-analysis-data.actions';

@Injectable()
export class RootCauseAnalysisWidgetEffects {
  @Effect()
  loadRootCauseAnalysisWidget$: Observable<any> = this.actions$.pipe(
    ofType(
      fromRootCauseAnalysisWidgetActions.RootCauseAnalysisWidgetActionTypes
        .LoadRootCauseAnalysisWidget
    ),
    mergeMap(
      (
        action: fromRootCauseAnalysisWidgetActions.LoadRootCauseAnalysisWidget
      ) =>
        this.rootCauseAnalysisWidgetService.getWidget(action.widgetId).pipe(
          map(
            (rootCauseAnalysisWidget: RootCauseAnalysisWidget) =>
              new fromRootCauseAnalysisWidgetActions.AddRootCauseAnalysisWidget(
                rootCauseAnalysisWidget
              )
          ),
          catchError((error: any) =>
            of(
              new fromRootCauseAnalysisWidgetActions.LoadRootCauseAnalysisWidgetFail(
                error
              )
            )
          )
        )
    )
  );

  @Effect()
  addRootCauseAnalysisWidget$: Observable<any> = this.actions$.pipe(
    ofType(
      fromRootCauseAnalysisWidgetActions.RootCauseAnalysisWidgetActionTypes
        .AddRootCauseAnalysisWidget
    ),
    map(
      (action: fromRootCauseAnalysisWidgetActions.AddRootCauseAnalysisWidget) =>
        new LoadRootCauseAnalysisDatas(
          action.rootCauseAnalysisWidget.configurationId
        )
    )
  );
  constructor(
    private actions$: Actions,
    private rootCauseAnalysisWidgetService: RootCauseAnalysisWidgetService
  ) {}
}
