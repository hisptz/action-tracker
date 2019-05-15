import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { ActionTrackerConfigurationActionTypes } from '../actions/action-tracker-configuration.actions';
import {
  ActionTrackerDataActionTypes,
  LoadActionTrackerDatas,
  AddActionTrackerDatas,
  LoadActionTrackerDatasFail
} from '../actions/action-tracker-data.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { ActionTrackerData } from '../../models/action-tracker-data.model';
import { ActionTrackerDataService } from '../../services/action-tracker-data.service';

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

  constructor(
    private actions$: Actions,
    private actionTrackerDataService: ActionTrackerDataService
  ) {}
}
