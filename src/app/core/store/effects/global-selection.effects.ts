import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { tap, withLatestFrom } from "rxjs/operators";

import { getDataParams } from "../../helpers/get-data-params.helper";
import { LoadActionTrackerDatas } from "../actions/action-tracker-data.actions";
import {
  GlobalSelectionActionTypes,
  UpsertDataSelectionsAction
} from "../actions/global-selection.actions";
import {
  LoadRootCauseAnalysisDatas,
  SetRootCauseDataCount
} from "../actions/root-cause-analysis-data.actions";
import { State } from "../reducers";
import { getCurrentActionTrackerConfig } from "../selectors/action-tracker-configuration.selectors";

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
        this.store.dispatch(new SetRootCauseDataCount(dataParams.length));
        dataParams.forEach((params: any) => {
          // Load root cause analysis data
          this.store.dispatch(new LoadRootCauseAnalysisDatas(params));
          // Load action tracker data
          // this.store.dispatch(new LoadActionTrackerDatas(params));
        });
      }
    })
  );
  constructor(private actions$: Actions, private store: Store<State>) {}
}
