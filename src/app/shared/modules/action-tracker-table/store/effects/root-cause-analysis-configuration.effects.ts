import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';

import * as fromRootCauseAnalysisConfigurationActions from '../actions/root-cause-analysis-configuration.actions';
import * as fromRootCauseAnalysisWidgetActions from '../actions/root-cause-analysis-widget.actions';
import { RootCauseAnalysisConfiguration } from '../models/root-cause-analysis-configuration.model';
import { RootCauseAnalysisConfigurationsService } from '../../services';
import { mergeMap, map, catchError, switchMap } from 'rxjs/operators';

@Injectable()
export class RootCauseAnalysisConfigurationEffects {
  @Effect()
  loadRootCauseAnalysisConfiguration$: Observable<any> = this.actions$.pipe(
    ofType(
      fromRootCauseAnalysisConfigurationActions
        .RootCauseAnalysisConfigurationActionTypes
        .LoadRootCauseAnalysisConfigurations
    ),
    mergeMap(
      (
        action: fromRootCauseAnalysisConfigurationActions.LoadRootCauseAnalysisConfigurations
      ) =>
        this.rootCauseAnalysisConfigurationService
          .getAllConfigurations(action.configurationId)
          .pipe(
            map(
              (
                rootCauseAnalysisConfigurations: RootCauseAnalysisConfiguration[]
              ) =>
                new fromRootCauseAnalysisConfigurationActions.AddRootCauseAnalysisConfigurations(
                  rootCauseAnalysisConfigurations,
                  action.widgetId
                )
            ),
            catchError((error: any) =>
              of(
                new fromRootCauseAnalysisConfigurationActions.LoadRootCauseAnalysisConfigurationFail(
                  error
                )
              )
            )
          )
    )
  );

  @Effect()
  addRootCauseAnalysisConfigurations$: Observable<any> = this.actions$.pipe(
    ofType(
      fromRootCauseAnalysisConfigurationActions
        .RootCauseAnalysisConfigurationActionTypes
        .AddRootCauseAnalysisConfigurations
    ),
    map(
      (
        action: fromRootCauseAnalysisConfigurationActions.AddRootCauseAnalysisConfigurations
      ) =>
        new fromRootCauseAnalysisWidgetActions.LoadRootCauseAnalysisWidget(
          action.currentRootCauseWidgetId
        )
    )
  );

  constructor(
    private actions$: Actions,
    private rootCauseAnalysisConfigurationService: RootCauseAnalysisConfigurationsService
  ) {}
}
