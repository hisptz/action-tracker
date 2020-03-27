import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { defer, Observable, of } from 'rxjs';
import { map, switchMap, withLatestFrom, catchError } from 'rxjs/operators';
import { set } from 'lodash';
import { State } from '../reducers';
import { ActionTrackerConfigurationService } from '../../services';

export class ColumsSettingsEffects {
    @Effect()
    loadColumnSetting: Observable<any>



  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private actionTrackerConfigService: ActionTrackerConfigurationService
  ) {}
}