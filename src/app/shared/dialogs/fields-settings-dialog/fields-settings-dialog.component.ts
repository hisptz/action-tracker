import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/core/store/reducers';
import * as _ from 'lodash';
import { getDataElementsFromConfiguration } from 'src/app/core/store/selectors/action-tracker-configuration.selectors';
import { getTableFieldsSettings, tableFieldsSettingsLoadingStatus, tableFieldsSettingsLoadedStatus } from 'src/app/core/store/selectors/table-fields-settings.selectors';
import {
  CheckMandatorySettingsExistAction,
  UpdateMandatoryFieldsForTheTableAction,
} from 'src/app/core/store/actions/table-fields-settings.actions';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-fields-settings-dialog',
  templateUrl: './fields-settings-dialog.component.html',
  styleUrls: ['./fields-settings-dialog.component.css'],
})
export class FieldsSettingsDialogComponent implements OnInit {

  tableFields$: Observable<any>;
  dataLoading$: Observable<boolean>;
  dataLoaded$: Observable<boolean>;
  
  constructor(
    private store: Store<State>,
    public dialogRef: MatDialogRef<FieldsSettingsDialogComponent>,
  ) {}

  ngOnInit() {
    this.dataLoading$ = this.store.pipe(select(tableFieldsSettingsLoadingStatus));
    this.dataLoaded$ = this.store.pipe(select(tableFieldsSettingsLoadedStatus));
    this.tableFields$ = this.store.pipe(
      select(getTableFieldsSettings)
    );
  }
  saveSettings(form, fields) {
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
