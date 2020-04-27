import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { defer, Observable, of } from 'rxjs';
import { map, switchMap, withLatestFrom, catchError } from 'rxjs/operators';
import { set } from 'lodash';
import { State } from '../reducers';
import { TableFieldsSettingsService } from '../../services/table-fields-settings.service';
import {
  TableFieldsSettingsTypes,
  TableFieldsSettingsActions,
  CheckMandatorySettingsExistAction,
  CheckMandatorySettingsExistSuccessAction,
  CheckMandatorySettingsExistFailureAction,
  CreateMandatoryFieldsForTheTableFailureAction,
  UpdateMandatoryFieldsForTheTableFailureAction,
  CreateMandatoryFieldsForTheTableAction,
  LoadMandatoryFieldsForTheTableSuccessAction,
  LoadMandatoryFieldsForTheTableFailureAction,
  LoadMandatoryFieldsForTheTableAction,
} from '../actions/table-fields-settings.actions';

@Injectable()
export class TableFieldsSettingsEffects {
  @Effect()
  checkTableFieldsExist$: Observable<Action> = this.actions$.pipe(
    ofType(TableFieldsSettingsTypes.CheckMandatorySettingsExist),
    switchMap(() => {
      return this.tableFieldsService.getDatastoreNamespaces().pipe(
        map((data: any) => {
          if (!data || !data.includes('table-fields-settings')) {
            return new CreateMandatoryFieldsForTheTableAction({});
          }
          return new CheckMandatorySettingsExistSuccessAction(data);
          //   return new LoadMandatoryFieldsForTheTableAction();
        }),
        catchError((error) => {
          console.log(error);
          return of(new CheckMandatorySettingsExistFailureAction(error));
        })
      );
    })
  );
  @Effect()
  loadTableFieldsExist$: Observable<Action> = this.actions$.pipe(
    ofType(TableFieldsSettingsTypes.LoadMandatoryFieldsForTheTable),
    switchMap(() => {
      return this.tableFieldsService.getMandatoryFieldsSettings().pipe(
        map((data: any) => {
          console.log({ data });
          return new LoadMandatoryFieldsForTheTableSuccessAction(data);
        }),
        catchError((error) => {
          console.log(error);
          return of(new LoadMandatoryFieldsForTheTableFailureAction(error));
        })
      );
    })
  );
  @Effect()
  createTableMandatoryFields$: Observable<Action> = this.actions$.pipe(
    ofType(TableFieldsSettingsTypes.CreateMandatoryFieldsForTheTable),
    map((action: any) => action.payload),
    switchMap((payload) => {
      return this.tableFieldsService.createMandatorySettingsKey(payload).pipe(
        map((data: any) => {
          return new LoadMandatoryFieldsForTheTableAction();
        }),
        catchError((error) => {
          console.log(error);
          return of(new CreateMandatoryFieldsForTheTableFailureAction(error));
        })
      );
    })
  );
  @Effect()
  updateTableMandatoryFields$: Observable<Action> = this.actions$.pipe(
    ofType(TableFieldsSettingsTypes.UpdateMandatoryFieldsForTheTable),
    map((action: any) => action.payload),
    switchMap((payload) => {
      return this.tableFieldsService.updateMandatorySettingsData(payload).pipe(
        map((data: any) => {
          return new LoadMandatoryFieldsForTheTableAction();
        }),
        catchError((error) => {
          console.log(error);
          return of(new UpdateMandatoryFieldsForTheTableFailureAction(error));
        })
      );
    })
  );
  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private tableFieldsService: TableFieldsSettingsService
  ) {}
}
