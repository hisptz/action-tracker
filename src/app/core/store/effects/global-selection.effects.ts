import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import * as _ from 'lodash';
import {
  GlobalSelectionActionTypes,
  UpsertDataSelectionsAction
} from '../actions/global-selection.actions';
import { switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { State } from '../reducers';
import { getCurrentRootCauseAnalysisConfiguration } from '../selectors/root-cause-analysis-configuration.selectors';
import { getCurrentActionTrackerConfig } from '../selectors/action-tracker-configuration.selectors';
import { getDataParams } from '../../helpers/get-data-params.helper';
import { LoadRootCauseAnalysisDatas } from '../actions/root-cause-analysis-data.actions';
import { LoadActionTrackerDatas } from '../actions/action-tracker-data.actions';

@Injectable()
export class GlobalSelectionEffects {
  @Effect({ dispatch: false })
  upsertDataSelections$: Observable<any> = this.actions$.pipe(
    ofType(GlobalSelectionActionTypes.UpsertDataSelections),
    withLatestFrom(this.store.select(getCurrentActionTrackerConfig)),
    tap(([action, actionTrackerConfig]: [UpsertDataSelectionsAction, any]) => {
      if (action.dataSelections && actionTrackerConfig) {
        const dataParams = getDataParams(
          action.dataSelections,
          actionTrackerConfig
        );
        dataParams.forEach((params: any) => {
          // Load root cause analysis data
          this.store.dispatch(new LoadRootCauseAnalysisDatas(params));
          // Load action tracker data
          this.store.dispatch(new LoadActionTrackerDatas(params));
        });
      }
    })
  );
  constructor(private actions$: Actions, private store: Store<State>) {}
}
