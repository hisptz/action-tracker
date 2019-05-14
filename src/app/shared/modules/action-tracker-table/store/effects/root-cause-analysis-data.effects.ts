import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import {
  switchMap,
  map,
  catchError,
  mergeMap,
  withLatestFrom,
  tap
} from "rxjs/operators";
import * as _ from "lodash";
import { ActionTrackerWidgetState } from "../reducers";
import * as fromRouterSelectors from "../../../../../core/store/selectors/router.selectors";
import * as fromRootCauseAnalysisDataActions from "../actions/root-cause-analysis-data.actions";
import { RootCauseAnalysisDataService } from "../../services";
import { RootCauseAnalysisData } from "../models/root-cause-analysis-data.model";
import { ROUTER_NAVIGATION, RouterNavigationAction } from "@ngrx/router-store";
import { getCurrentRootCauseAnalysisConfiguration } from "../selectors";
import { RootCauseAnalysisConfiguration } from "../models";
import { State } from "src/app/core/store/reducers";

@Injectable()
export class RootCauseAnalysisDataEffects {
  @Effect({ dispatch: false })
  routerChanged$: Observable<any> = this.actions$.pipe(
    ofType(ROUTER_NAVIGATION),
    withLatestFrom(this.store.select(getCurrentRootCauseAnalysisConfiguration)),
    tap(
      ([action, currentConfiguration]: [
        RouterNavigationAction,
        RootCauseAnalysisConfiguration
      ]) => {
        if (currentConfiguration) {
          this.store.dispatch(
            new fromRootCauseAnalysisDataActions.LoadRootCauseAnalysisDatas(
              currentConfiguration.id
            )
          );
        }
      }
    )
  );
  @Effect()
  loadRootCauseAnalysisDatas$: Observable<any> = this.actions$.pipe(
    ofType(
      fromRootCauseAnalysisDataActions.RootCauseAnalysisDataActionTypes
        .LoadRootCauseAnalysisDatas
    ),
    withLatestFrom(this.rootStore.select(fromRouterSelectors.getRouterParams)),
    mergeMap(
      ([action, routerParams]: [
        fromRootCauseAnalysisDataActions.LoadRootCauseAnalysisDatas,
        any
      ]) => {
        const namespaceParams = _.pick(routerParams, [
          "orgUnit",
          "period",
          "dashboard"
        ]);
        return this.rootCauseAnalysisDataService
          .getRootCauseAnalysisData(
            action.configurationId,
            namespaceParams.orgUnit.id,
            namespaceParams.period.id,
            namespaceParams.dashboard.id
          )
          .pipe(
            map(
              (rootCauseAnalysisData: RootCauseAnalysisData[]) =>
                new fromRootCauseAnalysisDataActions.AddRootCauseAnalysisDatas(
                  rootCauseAnalysisData
                )
            ),
            catchError((error: any) =>
              of(
                new fromRootCauseAnalysisDataActions.LoadRootCauseAnalysisDatasFail(
                  error
                )
              )
            )
          );
      }
    )
  );

  @Effect()
  saveRootCauseAnalysisData$: Observable<any> = this.actions$.pipe(
    ofType(
      fromRootCauseAnalysisDataActions.RootCauseAnalysisDataActionTypes
        .SaveRootCauseAnalysisData
    ),
    withLatestFrom(this.rootStore.select(fromRouterSelectors.getRouterParams)),
    switchMap(
      ([action, routerParams]: [
        fromRootCauseAnalysisDataActions.SaveRootCauseAnalysisData,
        any
      ]) => {
        const namespaceParams = _.pick(routerParams, [
          "orgUnit",
          "period",
          "dashboard"
        ]);
        return this.rootCauseAnalysisDataService
          .updateRootCauseAnalysisData(
            action.rootCauseAnalysisData,
            namespaceParams.orgUnit.id,
            namespaceParams.period.id,
            namespaceParams.dashboard.id
          )
          .pipe(
            map(
              () =>
                new fromRootCauseAnalysisDataActions.SaveRootCauseAnalysisDataSuccess(
                  action.rootCauseAnalysisData,
                  { [action.rootCauseAnalysisData.savingColor]: "green" }
                )
            )
          );
      }
    )
  );

  @Effect()
  createRootCauseAnalysisData$: Observable<any> = this.actions$.pipe(
    ofType(
      fromRootCauseAnalysisDataActions.RootCauseAnalysisDataActionTypes
        .CreateRootCauseAnalysisData
    ),
    withLatestFrom(this.rootStore.select(fromRouterSelectors.getRouterParams)),
    mergeMap(
      ([action, routerParams]: [
        fromRootCauseAnalysisDataActions.CreateRootCauseAnalysisData,
        any
      ]) => {
        const namespaceParams = _.pick(routerParams, [
          "orgUnit",
          "period",
          "dashboard"
        ]);
        return this.rootCauseAnalysisDataService
          .saveRootCauseAnalysisData(
            action.rootCauseAnalysisData,
            namespaceParams.orgUnit.id,
            namespaceParams.period.id,
            namespaceParams.dashboard.id
          )
          .pipe(
            map(
              () =>
                new fromRootCauseAnalysisDataActions.CreateRootCauseAnalysisDataSuccess(
                  action.rootCauseAnalysisData,
                  { [action.rootCauseAnalysisData.savingColor]: "green" }
                )
            ),
            catchError((error: any) =>
              of(
                new fromRootCauseAnalysisDataActions.CreateRootCauseAnalysisDataFail(
                  action.rootCauseAnalysisData,
                  error
                )
              )
            )
          );
      }
    )
  );

  @Effect()
  deleteIntervention$: Observable<any> = this.actions$.pipe(
    ofType(
      fromRootCauseAnalysisDataActions.RootCauseAnalysisDataActionTypes
        .DeleteRootCauseAnalysisData
    ),
    withLatestFrom(this.rootStore.select(fromRouterSelectors.getRouterParams)),
    mergeMap(
      ([action, routerParams]: [
        fromRootCauseAnalysisDataActions.DeleteRootCauseAnalysisData,
        any
      ]) => {
        const namespaceParams = _.pick(routerParams, [
          "orgUnit",
          "period",
          "dashboard"
        ]);
        return this.rootCauseAnalysisDataService
          .deleteRootCauseAnalysisData(
            action.rootCauseAnalysisData,
            namespaceParams.orgUnit.id,
            namespaceParams.period.id,
            namespaceParams.dashboard.id
          )
          .pipe(
            map(
              () =>
                new fromRootCauseAnalysisDataActions.DeleteRootCauseAnalysisDataSuccess(
                  action.rootCauseAnalysisData.id
                )
            ),
            catchError((error: any) =>
              of(
                new fromRootCauseAnalysisDataActions.DeleteRootCauseAnalysisDataFail(
                  action.rootCauseAnalysisData,
                  error
                )
              )
            )
          );
      }
    )
  );
  // DeleteRootCauseAnalysisData

  constructor(
    private actions$: Actions,
    private rootCauseAnalysisDataService: RootCauseAnalysisDataService,
    private store: Store<ActionTrackerWidgetState>,
    private rootStore: Store<State>
  ) {}
}
