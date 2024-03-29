import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import * as _ from 'lodash';
import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap, withLatestFrom,} from 'rxjs/operators';
import {State} from 'src/app/core/store/reducers';

import {RootCauseAnalysisData} from '../../models/root-cause-analysis-data.model';
import {RootCauseAnalysisDataService} from '../../services/root-cause-analysis-data.service';
import * as fromRootCauseAnalysisDataActions from '../actions/root-cause-analysis-data.actions';
import {LoadActionTrackerDatas} from '../actions/action-tracker-data.actions';
import {getRouterParams} from '../selectors';
import {loadReportVisualizations} from '../actions/report-visualization.actions';

@Injectable()
export class RootCauseAnalysisDataEffects {
  @Effect({ dispatch: false })
  loadRootCauseAnalysisDatas$: Observable<any> = this.actions$.pipe(
    ofType(
      fromRootCauseAnalysisDataActions.RootCauseAnalysisDataActionTypes
        .LoadRootCauseAnalysisDatas
    ),

    mergeMap(
      (action: fromRootCauseAnalysisDataActions.LoadRootCauseAnalysisDatas) => {
        this.rootStore.dispatch(loadReportVisualizations());
        return this.rootCauseAnalysisDataService
          .getRootCauseAnalysisData(
            action.dataParams.intervention,
            action.dataParams.period
          )
          .pipe(
            map((rootCauseAnalysisData: RootCauseAnalysisData[]) => {
              this.rootStore.dispatch(
                new fromRootCauseAnalysisDataActions.AddRootCauseAnalysisDatas(
                  rootCauseAnalysisData
                )
              );
              this.rootStore.dispatch(
                new LoadActionTrackerDatas(action.dataParams)
              );
            }),
            catchError((error: any) => {
              this.rootStore.dispatch(
                new fromRootCauseAnalysisDataActions.LoadRootCauseAnalysisDatasFail(
                  error
                )
              );

              return of(
                new fromRootCauseAnalysisDataActions.LoadRootCauseAnalysisDatasFail(
                  error
                )
              );
            })
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
    withLatestFrom(this.rootStore.select(getRouterParams)),
    switchMap(
      ([action, routerParams]: [
        fromRootCauseAnalysisDataActions.SaveRootCauseAnalysisData,
        any
      ]) => {
        const namespaceParams = _.pick(routerParams, [
          'orgUnit',
          'period',
          'dashboard',
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
                  { [action.rootCauseAnalysisData.savingColor]: 'green' }
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
    withLatestFrom(this.rootStore.select(getRouterParams)),
    mergeMap(
      ([action, routerParams]: [
        fromRootCauseAnalysisDataActions.CreateRootCauseAnalysisData,
        any
      ]) => {
        const namespaceParams = _.pick(routerParams, [
          'orgUnit',
          'period',
          'dashboard',
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
                  { [action.rootCauseAnalysisData.savingColor]: 'green' }
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
    withLatestFrom(this.rootStore.select(getRouterParams)),
    mergeMap(
      ([action, routerParams]: [
        fromRootCauseAnalysisDataActions.DeleteRootCauseAnalysisData,
        any
      ]) => {
        const namespaceParams = _.pick(routerParams, [
          'orgUnit',
          'period',
          'dashboard',
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
    private rootStore: Store<State>
  ) {}
}
