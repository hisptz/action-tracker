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
  CreateActionTrackerData,
  CreateActionTrackerDataFail,
  CreateActionTrackerDataSuccess,
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
  createActionTrackerData$: Observable<any> = this.actions$.pipe(
    ofType(ActionTrackerDataActionTypes.CreateActionTrackerData),
    withLatestFrom(this.store.select(getCurrentActionTrackerConfig)),
    mergeMap(
      ([action, actionTrackerConfig]: [CreateActionTrackerData, any]) => {
        return this.actionTrackerDataService
          .addData(
            actionTrackerConfig,
            action.actionTrackerDataValues,
            action.selectionParams
          )
          .pipe(
            map(
              (actionTrackerData: any) =>
                new CreateActionTrackerDataSuccess(actionTrackerData, {
                  [actionTrackerData.savingColor]: 'green'
                })
            ),
            catchError((error: any) =>
              of(new CreateActionTrackerDataFail(error))
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
