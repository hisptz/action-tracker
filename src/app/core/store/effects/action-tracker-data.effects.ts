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
  DeleteActionTrackerData,
  DeleteActionTrackerDataFail,
  DeleteActionTrackerDataSuccess,
  LoadActionTrackerDatas,
  LoadActionTrackerDatasFail
} from '../actions/action-tracker-data.actions';
import { State } from '../reducers';
import { getRootCauseAnalysisDatas } from '../selectors/root-cause-analysis-data.selectors';
import { TrackedEntityInstanceService } from '../../services';

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
              console.log({ actionTrackerDatas });
              return new AddActionTrackerDatas(actionTrackerDatas);
            }),
            catchError((error: any) =>
              of(new LoadActionTrackerDatasFail(error))
            )
          );
      }
    )
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

  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private actionTrackerDataService: ActionTrackerDataService,
    private trackedEntityInstanceService: TrackedEntityInstanceService
  ) {}
}
