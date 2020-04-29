import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import {  Observable, of } from 'rxjs';
import {
  map,
  switchMap,
  withLatestFrom,
  catchError,
  mergeMap,
} from 'rxjs/operators';
import * as _ from 'lodash';
import { State } from '../reducers';
import { TableFieldsSettingsService } from '../../services/table-fields-settings.service';
import {
  TableFieldsSettingsTypes,
  CheckMandatorySettingsExistFailureAction,
  CreateMandatoryFieldsForTheTableFailureAction,
  UpdateMandatoryFieldsForTheTableFailureAction,
  CreateMandatoryFieldsForTheTableAction,
  LoadMandatoryFieldsForTheTableSuccessAction,
  LoadMandatoryFieldsForTheTableFailureAction,
  LoadMandatoryFieldsForTheTableAction,
  UpdateMandatoryFieldsForTheTableAction,
} from '../actions/table-fields-settings.actions';
import { getDataElementsFromConfiguration } from '../selectors/action-tracker-configuration.selectors';
import {
  ActionTrackerConfigurationActionTypes,
} from '../actions/action-tracker-configuration.actions';
import { getConfigurationLoadedStatus } from '../selectors/root-cause-analysis-configuration.selectors';

@Injectable()
export class TableFieldsSettingsEffects {
  @Effect()
  checkTableFieldsExist$: Observable<Action> = this.actions$.pipe(
    ofType(ActionTrackerConfigurationActionTypes.AddActionTrackerConfiguration),
    withLatestFrom(
      this.store.select(getDataElementsFromConfiguration),
      this.store.select(getConfigurationLoadedStatus),
      this.store.select(getConfigurationLoadedStatus)
    ),
    mergeMap(([action, dataElements, loadedStatus]) => {
      const fieldsSettings = this.getFieldsSettings(dataElements);
      const initialDataStored =
        JSON.parse(localStorage.getItem('tableFieldsInitialItem')) || '';

      if (initialDataStored && loadedStatus) {
        localStorage.removeItem('tableFieldsInitialItem');
        this.store.dispatch(
          new UpdateMandatoryFieldsForTheTableAction({
            fieldsSettings,
          })
        );
      }

      return this.tableFieldsService.getDatastoreNamespaces().pipe(
        map((data: any) => {
          if (!data || !data.includes('table-fields-settings')) {
            localStorage.setItem('tableFieldsInitialItem', 'true');
            return new CreateMandatoryFieldsForTheTableAction({
              fieldsSettings,
            });
          }
          // return new CheckMandatorySettingsExistSuccessAction(data);
          return new LoadMandatoryFieldsForTheTableAction();
        }),
        catchError((error) => {
          console.log(error);
          return of(new CheckMandatorySettingsExistFailureAction(error));
        })
      );
    })
  );
  @Effect()
  loadTableMandatoryFields$: Observable<Action> = this.actions$.pipe(
    ofType(TableFieldsSettingsTypes.LoadMandatoryFieldsForTheTable),
    switchMap(() => {
      return this.tableFieldsService.getMandatoryFieldsSettings().pipe(
        map((data: any) => {
          const { fieldsSettings } = data;
          if (fieldsSettings) {
            return new LoadMandatoryFieldsForTheTableSuccessAction(
              fieldsSettings
            );
          }
          return new LoadMandatoryFieldsForTheTableSuccessAction([]);
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

  getFieldsSettings(dataElements) {
    return (
      _.flattenDeep(
        _.map(dataElements || [], (element) => {
          if (
            element &&
            element.hasOwnProperty('id') &&
            element.hasOwnProperty('name') &&
            element.hasOwnProperty('columnMandatory') &&
            !element?.isHidden
          ) {
            const { id, name } = element;
            return { ...{}, id, name, columnMandatory: false };
          } else {
            return [];
          }
        })
      ) || []
    );
  }
  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private tableFieldsService: TableFieldsSettingsService
  ) {}
}
