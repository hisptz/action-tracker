import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";

import { mergeMap, map, catchError, switchMap } from "rxjs/operators";
import { RootCauseAnalysisConfigurationsService } from "src/app/shared/modules/action-tracker-table/services";
import { RootCauseAnalysisConfiguration } from "../../models/root-cause-analysis-configuration.model";
import {
  RootCauseAnalysisConfigurationActionTypes,
  LoadRootCauseAnalysisConfigurationAction,
  AddRootCauseAnalysisConfigurationAction,
  LoadRootCauseAnalysisConfigurationFail
} from "../actions/root-cause-analysis-configuration.actions";

@Injectable()
export class RootCauseAnalysisConfigurationEffects {
  @Effect()
  loadRootCauseAnalysisConfiguration$: Observable<any> = this.actions$.pipe(
    ofType(
      RootCauseAnalysisConfigurationActionTypes.LoadRootCauseAnalysisConfiguration
    ),
    mergeMap((action: LoadRootCauseAnalysisConfigurationAction) => {
      return this.rootCauseAnalysisConfigurationService
        .findById(action.configurationId)
        .pipe(
          map(
            (rootCauseAnalysisConfiguration: RootCauseAnalysisConfiguration) =>
              new AddRootCauseAnalysisConfigurationAction(
                rootCauseAnalysisConfiguration
              )
          ),
          catchError((error: any) =>
            of(new LoadRootCauseAnalysisConfigurationFail(error))
          )
        );
    })
  );

  // @Effect()
  // addRootCauseAnalysisConfigurations$: Observable<any> = this.actions$.pipe(
  //   ofType(
  //     fromRootCauseAnalysisConfigurationActions
  //       .RootCauseAnalysisConfigurationActionTypes
  //       .AddRootCauseAnalysisConfigurations
  //   ),
  //   map(
  //     (
  //       action: fromRootCauseAnalysisConfigurationActions.AddRootCauseAnalysisConfigurations
  //     ) =>
  //       new fromRootCauseAnalysisWidgetActions.LoadRootCauseAnalysisWidget(
  //         action.currentRootCauseWidgetId
  //       )
  //   )
  // );

  constructor(
    private actions$: Actions,
    private rootCauseAnalysisConfigurationService: RootCauseAnalysisConfigurationsService
  ) {}
}
