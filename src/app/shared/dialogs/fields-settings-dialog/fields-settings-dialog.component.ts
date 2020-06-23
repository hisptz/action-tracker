import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/core/store/reducers';
import * as _ from 'lodash';
import { getDataElementsFromConfiguration } from 'src/app/core/store/selectors/action-tracker-configuration.selectors';
import {
  getTableFieldsSettings,
  tableFieldsSettingsLoadingStatus,
  tableFieldsSettingsLoadedStatus,
} from 'src/app/core/store/selectors/table-fields-settings.selectors';
import {
  CheckMandatorySettingsExistAction,
  UpdateMandatoryFieldsForTheTableAction,
} from 'src/app/core/store/actions/table-fields-settings.actions';
import { MatDialogRef } from '@angular/material/dialog';
import { getColumnSettingsInitialData } from 'src/app/core/store/selectors/column-settings.selectors';
import { SetColumnSettingsAction } from 'src/app/core/store/actions/columns-settings.actions';
@Component({
  selector: 'app-fields-settings-dialog',
  templateUrl: './fields-settings-dialog.component.html',
  styleUrls: ['./fields-settings-dialog.component.css'],
})
export class FieldsSettingsDialogComponent implements OnInit {
  tableFields$: Observable<any>;
  columnSettings$: Observable<any>;
  dataLoading$: Observable<boolean>;
  dataLoaded$: Observable<boolean>;

  constructor(
    private store: Store<State>,
    public dialogRef: MatDialogRef<FieldsSettingsDialogComponent>
  ) {}

  ngOnInit() {
    this.dataLoading$ = this.store.pipe(
      select(tableFieldsSettingsLoadingStatus)
    );
    this.dataLoaded$ = this.store.pipe(select(tableFieldsSettingsLoadedStatus));
    this.tableFields$ = this.store.pipe(select(getTableFieldsSettings));
    this.columnSettings$ = this.store.select(getColumnSettingsInitialData);
  }
  saveSettings(form, fields, columnSettings) {
    if (form && form.hasOwnProperty('form')) {
      const { value } = form.form;
      const fieldsSettings = _.flattenDeep(
        _.map(fields, (field) => {
          if (
            field &&
            field.hasOwnProperty('id') &&
            field.hasOwnProperty('name') &&
            field.hasOwnProperty('columnMandatory')
          ) {
            const { id, name } = field;
            if (value && value.hasOwnProperty(id) && value[id]) {
              return { ...{}, id, name, columnMandatory: value[id] } || [];
            }
            return { ...{}, id, name, columnMandatory: false } || [];
          } else {
            return [];
          }
        })
      );
      const updatedColumnSettings = _.map(columnSettings || [], (setting) => {
        const field =
          setting && setting.hasOwnProperty('id')
            ? _.find(
                fieldsSettings || [],
                (fieldSetting) => fieldSetting.id === setting.id
              ) || {}
            : {};
        return field &&
          field.hasOwnProperty('id') &&
          field.hasOwnProperty('columnMandatory') &&
          field.columnMandatory
          ? { ...setting, isVisible: true, columnMandatory: field.columnMandatory }
          : {...setting };
      });

      this.store.dispatch(new SetColumnSettingsAction(updatedColumnSettings));

      this.store.dispatch(
        new UpdateMandatoryFieldsForTheTableAction({ fieldsSettings })
      );
      this.closeDialog('Saved');
    }
  }
  closeDialog(action: string) {
    this.dialogRef.close(action);
  }
}
