import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { defer, Observable, of } from 'rxjs';
import { map, switchMap, withLatestFrom, catchError } from 'rxjs/operators';
import { set } from 'lodash';
import { ActionTrackerConfigurationService } from '../../services';
import {
  ActionTrackerConfigurationActionTypes,
  AddActionTrackerConfigurationAction,
  LoadActionTrackerConfigurationAction,
  LoadActionTrackerConfigurationFail,
  UploadActionTrackerConfiguration,
} from '../actions/action-tracker-configuration.actions';
import { LoadRootCauseAnalysisConfigurationAction } from '../actions/root-cause-analysis-configuration.actions';
import { UserActionTypes } from '../actions/user.actions';

import { State } from '../reducers';

import { getCurrentUserOrgUnit } from '../selectors/user.selectors';
import { getCurrentActionTrackerConfigId } from '../selectors/action-tracker-configuration.selectors';

import { defaultActionTrackerProgram } from '../../defaults/action-tracker-program-metadata';

@Injectable()
export class ActionTrackerConfigurationEffects {
  @Effect()
  loadActionTrackerConfig$: Observable<Action> = this.actions$.pipe(
    ofType(
      UserActionTypes.AddCurrentUser,
      ActionTrackerConfigurationActionTypes.LoadActionTrackerConfiguration
    ),
    withLatestFrom(
      this.store.select(getCurrentActionTrackerConfigId),
      this.store.select(getCurrentUserOrgUnit)
    ),
    switchMap(
      ([action, currentConfigId, currentUserOrgunits]: [
        LoadActionTrackerConfigurationAction,
        string,
        any
      ]) => {
        return this.actionTrackerConfigService.findById(currentConfigId).pipe(
          map(
            (actionTrackerConfig: any) =>
              new AddActionTrackerConfigurationAction(actionTrackerConfig)
          ),
          catchError((error: any) => {
            if (error.status == 404) {
              set(
                defaultActionTrackerProgram,
                'programs[0].organisationUnits',
                currentUserOrgunits
              );
              return of(
                new UploadActionTrackerConfiguration(
                  defaultActionTrackerProgram
                )
              );
            }
            return of(new LoadActionTrackerConfigurationFail(error));
          })
        );
      }
    )
  );

  @Effect()
  uploadActionTrackerConfiguration$: Observable<Action> = this.actions$.pipe(
    ofType(
      ActionTrackerConfigurationActionTypes.UploadActionTrackerConfiguration
    ),
    switchMap((action: UploadActionTrackerConfiguration) => {
      return this.actionTrackerConfigService
        .add(action.defaultActionTrackerProgram)
        .pipe(map(() => new LoadActionTrackerConfigurationAction()));
    })
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
