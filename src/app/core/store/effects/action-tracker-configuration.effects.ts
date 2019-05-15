import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { defer, Observable, of } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';

import { ActionTrackerConfigurationService } from '../../services';
import {
  ActionTrackerConfigurationActionTypes,
  LoadActionTrackerConfigurationAction,
  AddActionTrackerConfigurationAction
} from '../actions/action-tracker-configuration.actions';
import { State } from '../reducers';
import { getCurrentActionTrackerConfigId } from '../selectors/action-tracker-configuration.selectors';
import {
  LoadRootCauseAnalysisConfigurationAction,
  RootCauseAnalysisConfigurationActionTypes
} from '../actions/root-cause-analysis-configuration.actions';

@Injectable()
export class ActionTrackerConfigurationEffects {
  @Effect()
  loadActionTrackerConfig$: Observable<Action> = this.actions$.pipe(
    ofType(
      ActionTrackerConfigurationActionTypes.LoadActionTrackerConfiguration
    ),
    withLatestFrom(this.store.select(getCurrentActionTrackerConfigId)),
    switchMap(
      ([action, currentConfigId]: [
        LoadActionTrackerConfigurationAction,
        string
      ]) => {
        return this.actionTrackerConfigService
          .findById(currentConfigId)
          .pipe(
            map(
              (actionTrackerConfig: any) =>
                new AddActionTrackerConfigurationAction(actionTrackerConfig)
            )
          );
      }
    )
  );

  @Effect()
  addActionTracker$: Observable<Action> = this.actions$.pipe(
    ofType(ActionTrackerConfigurationActionTypes.AddActionTrackerConfiguration),
    map(
      (action: AddActionTrackerConfigurationAction) =>
        new LoadRootCauseAnalysisConfigurationAction(
          action.actionTrackerConfig
            ? action.actionTrackerConfig.rootCauseConfigurationId
            : ''
        )
    )
  );

  @Effect()
  init$: Observable<Action> = defer(() => {
    return of(new LoadActionTrackerConfigurationAction());
  });

  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private actionTrackerConfigService: ActionTrackerConfigurationService
  ) {}
}
