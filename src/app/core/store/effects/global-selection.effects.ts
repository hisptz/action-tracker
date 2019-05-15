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

@Injectable()
export class GlobalSelectionEffects {
  @Effect({ dispatch: false })
  upsertDataSelections$: Observable<any> = this.actions$.pipe(
    ofType(GlobalSelectionActionTypes.UpsertDataSelections),
    withLatestFrom(this.store.select(getCurrentRootCauseAnalysisConfiguration)),
    tap(([action, rootCauseConfig]: [UpsertDataSelectionsAction, any]) => {
      console.log(action.dataSelections, rootCauseConfig);
      const interventionObject = _.find(action.dataSelections, [
        'dimension',
        'intervention'
      ]);

      const periodObject = _.find(action.dataSelections, ['dimension', 'pe']);
      const orgUnitObject = _.find(action.dataSelections, ['dimension', 'ou']);

      console.log(interventionObject, periodObject, orgUnitObject);
    })
  );
  constructor(private actions$: Actions, private store: Store<State>) {}
}
