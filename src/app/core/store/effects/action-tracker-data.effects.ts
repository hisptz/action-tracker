import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, withLatestFrom} from 'rxjs/operators';

import {ActionTrackerData} from '../../models/action-tracker-data.model';
import {ActionTrackerDataService} from '../../services/action-tracker-data.service';

import {
  ActionTrackerDataActionTypes,
  AddActionTrackerData,
  AddActionTrackerDataFail,
  AddActionTrackerDatas,
  AddActionTrackerDataSuccess,
  DeleteActionTrackerData,
  DeleteActionTrackerDataFail,
  DeleteActionTrackerDataSuccess,
  LoadActionTrackerDatas,
  LoadActionTrackerDatasFail,
  SaveActionTrackerData,
  SaveActionTrackerDataFail,
  SaveActionTrackerDataSuccess,
} from '../actions/action-tracker-data.actions';
import {State} from '../reducers';
import {getRootCauseAnalysisDatas} from '../selectors/root-cause-analysis-data.selectors';
import {TrackedEntityInstanceService} from '../../services';
import {getCurrentActionTrackerConfig} from '../selectors/action-tracker-configuration.selectors';

import * as _ from 'lodash';
import {ImportSummaryHelper} from '../../helpers/analyze-import-summary.helper';

@Injectable()
export class ActionTrackerDataEffects {
  @Effect({dispatch: false})
  loadActionTrackerDatas$: Observable<any> = this.actions$.pipe(
    ofType(ActionTrackerDataActionTypes.LoadActionTrackerDatas),
    withLatestFrom(this.store.select(getRootCauseAnalysisDatas)),

    mergeMap(
      ([action, rootCauseAnalysisData]: [LoadActionTrackerDatas, any]) => {
        return this.trackedEntityInstanceService
          .discoveringSavedTEI(rootCauseAnalysisData)
          .pipe(
            map((actionTrackerDatas: ActionTrackerData[]) => {
              this.store.dispatch(
                new AddActionTrackerDatas(_.flatten(actionTrackerDatas))
              );
            }),
            catchError((error: any) => {
              return of(new LoadActionTrackerDatasFail(error));
            })
          );
      }
    )
  );

  @Effect()
  saveActionTrackerData$: Observable<any> = this.actions$.pipe(
    ofType(ActionTrackerDataActionTypes.SaveActionTrackerData),
    withLatestFrom(this.store.select(getCurrentActionTrackerConfig)),
    mergeMap(([action, actionTrackerConfig]: [SaveActionTrackerData, any]) => {
      const actionTrackerDataValues = action.actionTrackerData;

      return this.trackedEntityInstanceService
        .savingTEI(actionTrackerDataValues)
        .pipe(
          map(
            (actionTrackerData: any) => {
              const dataUploadStatus = ImportSummaryHelper.analyzeImportSummary(actionTrackerData);
              if (dataUploadStatus.status === 'SUCCESS') {
                return new SaveActionTrackerDataSuccess(actionTrackerDataValues);
              }
              console.error(Error(dataUploadStatus.errors?.join(', ')));
              return new SaveActionTrackerDataFail(new Error(dataUploadStatus.errors?.join('\n')));
            }
          ),
          catchError((error: any) => of(new SaveActionTrackerDataFail(error)))
        );
    })
  );

  @Effect()
  addActionTrackerData$: Observable<any> = this.actions$.pipe(
    ofType(ActionTrackerDataActionTypes.AddActionTrackerData),
    mergeMap((action: AddActionTrackerData) => {
      return of(action.actionTrackerData).pipe(
        map(
          (actionTrackerData: any) =>
            new AddActionTrackerDataSuccess(actionTrackerData)
        ),
        catchError((error: any) => of(new AddActionTrackerDataFail(error)))
      );
    })
  );

  @Effect()
  deleteActionTrackerData$: Observable<any> = this.actions$.pipe(
    ofType(ActionTrackerDataActionTypes.DeleteActionTrackerData),
    mergeMap((action: DeleteActionTrackerData) => {
      return this.trackedEntityInstanceService
        .deletingTEI(action.actionTrackerDataId)
        .pipe(
          map(
            () => new DeleteActionTrackerDataSuccess(action.actionTrackerDataId)
          ),
          catchError((error: any) =>
            of(
              new DeleteActionTrackerDataFail(action.actionTrackerDataId, error)
            )
          )
        );
    })
  );

  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private actionTrackerDataService: ActionTrackerDataService,
    private trackedEntityInstanceService: TrackedEntityInstanceService
  ) {
  }
}
