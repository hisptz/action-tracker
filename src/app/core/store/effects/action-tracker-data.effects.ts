import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
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
  CancelActionTrackerData,
  DeleteActionTrackerData,
  DeleteActionTrackerDataFail,
  DeleteActionTrackerDataSuccess,
  LoadActionTrackerDatas,
  LoadActionTrackerDatasFail
} from '../actions/action-tracker-data.actions';
import { State } from '../reducers';
import { getCurrentActionTrackerConfig } from '../selectors/action-tracker-configuration.selectors';

@Injectable()
export class ActionTrackerDataEffects {
  @Effect()
  loadActionTrackerDatas$: Observable<any> = this.actions$.pipe(
    ofType(ActionTrackerDataActionTypes.LoadActionTrackerDatas),
    mergeMap((action: LoadActionTrackerDatas) => {
      return this.actionTrackerDataService
        .getData(
          action.dataParams.actionTrackerConfig,
          action.dataParams.orgUnit,
          action.dataParams.period,
          action.dataParams.intervention
        )
        .pipe(
          map(
            (actionTrackerDatas: ActionTrackerData[]) =>
              new AddActionTrackerDatas(actionTrackerDatas)
          ),
          catchError((error: any) => of(new LoadActionTrackerDatasFail(error)))
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
  saveActionTrackerData$: Observable<any> = this.actions$.pipe(
    ofType(ActionTrackerDataActionTypes.SaveActionTrackerData),
    withLatestFrom(this.store.select(getCurrentActionTrackerConfig)),
    mergeMap(([action, actionTrackerConfig]: [SaveActionTrackerData, any]) => {
      const actionTrackerDataValues = action.actionTrackerData
        ? action.actionTrackerData.dataValues
        : null;
      const selectionParams = action.actionTrackerData
        ? action.actionTrackerData.selectionParams
        : null;

      return (action.actionTrackerDataId
        ? this.actionTrackerDataService.updateData(
            actionTrackerConfig,
            actionTrackerDataValues,
            selectionParams,
            action.actionTrackerDataId
          )
        : this.actionTrackerDataService.addData(
            actionTrackerConfig,
            actionTrackerDataValues,
            selectionParams
          )
      ).pipe(
        map(
          (actionTrackerData: any) =>
            new SaveActionTrackerDataSuccess(actionTrackerData, {
              [actionTrackerData.savingColor]: 'green'
            })
        ),
        catchError((error: any) => of(new SaveActionTrackerDataFail(error)))
      );
    })
  );

  @Effect()
  deleteActionTrackerData$: Observable<any> = this.actions$.pipe(
    ofType(ActionTrackerDataActionTypes.DeleteActionTrackerData),
    withLatestFrom(this.store.select(getCurrentActionTrackerConfig)),
    mergeMap(
      ([action, actionTrackerConfig]: [DeleteActionTrackerData, any]) => {
        const actionTrackerDataValues = action.actionTrackerData
          ? action.actionTrackerData.dataValues
          : null;
        const selectionParams = action.actionTrackerData
          ? action.actionTrackerData.selectionParams
          : null;
        return this.actionTrackerDataService
          .deleteData(
            actionTrackerConfig,
            actionTrackerDataValues,
            selectionParams,
            action.actionTrackerDataId
          )
          .pipe(
            map(
              () =>
                new DeleteActionTrackerDataSuccess(action.actionTrackerDataId)
            ),
            catchError((error: any) =>
              of(
                new DeleteActionTrackerDataFail(action.actionTrackerData, error)
              )
            )
          );
      }
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private actionTrackerDataService: ActionTrackerDataService
  ) {}
}
