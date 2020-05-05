import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';

import { ActionTrackerData } from '../../models/action-tracker-data.model';
import { ActionTrackerDataService } from '../../services/action-tracker-data.service';

import {
  ActionTrackerDataActionTypes,
  AddActionTrackerDatas,
  AddActionTrackerData,
  AddActionTrackerDataFail,
  AddActionTrackerDataSuccess,
  SaveActionTrackerData,
  SaveActionTrackerDataFail,
  SaveActionTrackerDataSuccess,
  DeleteActionTrackerData,
  DeleteActionTrackerDataFail,
  DeleteActionTrackerDataSuccess,
  LoadActionTrackerDatas,
  LoadActionTrackerDatasFail,
} from '../actions/action-tracker-data.actions';
import { State } from '../reducers';
import { getRootCauseAnalysisDatas } from '../selectors/root-cause-analysis-data.selectors';
import { TrackedEntityInstanceService } from '../../services';
import { getCurrentActionTrackerConfig } from '../selectors/action-tracker-configuration.selectors';

import * as _ from 'lodash';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable()
export class ActionTrackerDataEffects {
  @Effect({ dispatch: false })
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
              this.store.dispatch(new LoadActionTrackerDatasFail(error));
              const { message } = error;

              const showMessage = message
                ? this.showSnackbar(message)
                : this.showSnackbar(
                    'Failed to load action tracker data, Please check your internet connection or try again later'
                  );

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
            (actionTrackerData: any) =>
              new SaveActionTrackerDataSuccess(actionTrackerDataValues)
          ),
          catchError((error: any) => {
            const { message } = error;

            const showMessage = message
              ? this.showSnackbar(message)
              : this.showSnackbar(
                  'Failed to save action, Please check your internet connection or try again later'
                );

            return of(new SaveActionTrackerDataFail(error));
          })
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
        catchError((error: any) => {
          const { message } = error;

          const showMessage = message
            ? this.showSnackbar(message)
            : this.showSnackbar(
                'Failed to add action, Please check your internet connection or try again later'
              );

          return of(new AddActionTrackerDataFail(error));
        })
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
          catchError((error: any) => {
            const { message } = error;

            const showMessage = message
              ? this.showSnackbar(message)
              : this.showSnackbar(
                  'Failed to delete action, Please check your internet connection or try again later'
                );

            return of(
              new DeleteActionTrackerDataFail(action.actionTrackerDataId, error)
            );
          })
        );
    })
  );

  showSnackbar(message: string, action = 'Dismiss', duration = 3000) {
    this._snackbar.open(message, action, {
      verticalPosition: 'top',
    });
  }

  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private actionTrackerDataService: ActionTrackerDataService,
    private trackedEntityInstanceService: TrackedEntityInstanceService,
    private _snackbar: MatSnackBar
  ) {}
}
