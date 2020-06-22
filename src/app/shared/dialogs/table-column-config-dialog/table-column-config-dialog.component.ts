import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';
import * as _ from 'lodash';
import { Observable, BehaviorSubject } from 'rxjs';
import { RootCauseAnalysisConfiguration } from 'src/app/core/models/root-cause-analysis-configuration.model';
import { SetColumnSettingsAction } from 'src/app/core/store/actions/columns-settings.actions';
import { State } from 'src/app/core/store/reducers';
import { getMergedActionTrackerConfiguration } from 'src/app/core/store/selectors/action-tracker-configuration.selectors';
import { take } from 'rxjs/operators';
import {
  getColumnSettingsData,
  getColumnSettingsInitialData,
  getTableColumnSettings,
} from 'src/app/core/store/selectors/column-settings.selectors';
import {
  getFieldsSettingsData,
  getTableFieldsSettings,
  tableFieldsSettingsLoadingStatus,
  tableFieldsSettingsLoadedStatus,
} from 'src/app/core/store/selectors/table-fields-settings.selectors';

@Component({
  selector: 'app-table-column-config-dialog',
  templateUrl: './table-column-config-dialog.component.html',
  styleUrls: ['./table-column-config-dialog.component.css'],
})
export class TableColumnConfigDialogComponent implements OnInit {
  configuration$: Observable<RootCauseAnalysisConfiguration>;
  columnsMap;
  columnSettings$: Observable<any>;
  fieldsSettings$: Observable<any>;
  checkManagementColumnSettingsSource = new BehaviorSubject([]);
  checkManagementColumnSettings = this.checkManagementColumnSettingsSource.asObservable();
  checkAllSource = new BehaviorSubject(true);
  checkAll = this.checkAllSource.asObservable();
  unCheckAllSource = new BehaviorSubject(false);
  unCheckAll = this.unCheckAllSource.asObservable();
  checkSettings = {
    checkAll: true,
    uncheckAll: false,
  };

  tableFieldsSettingsLoading$: Observable<boolean>;
  tableFieldsSettingsLoaded$: Observable<boolean>;
  constructor(
    private store: Store<State>,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TableColumnConfigDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.initilizeData();
    this.tableFieldsSettingsLoading$ = this.store.pipe(
      select(tableFieldsSettingsLoadingStatus)
    );
    this.tableFieldsSettingsLoaded$ = this.store.pipe(
      select(tableFieldsSettingsLoadedStatus)
    );
  }
  initilizeData() {
    this.checkInitialCheckStatus();
    this.configuration$ = this.store.select(
      getMergedActionTrackerConfiguration
    );
    this.columnSettings$ = this.store.select(getTableColumnSettings);
    this.fieldsSettings$ = this.store.pipe(select(getTableFieldsSettings));
  }
  checkInitialCheckStatus() {
    const uncheckedArr = _.filter(Object.keys(this.data), (item) => {
      return item && !this.data[item];
    });
    if (!uncheckedArr.length) {
      this.checkAllSource.next(true);
      this.unCheckAllSource.next(false);
    } else if (uncheckedArr.length === Object.keys(this.data).length) {
      this.checkAllSource.next(true);
      this.unCheckAllSource.next(false);
    } else {
      this.checkAllSource.next(false);
      this.unCheckAllSource.next(false);
    }
  }
  saveColumns(savingData) {
    const { form, columnSettings } = savingData;
    const { value } = form || {};


    const data = _.flattenDeep(
      _.map(columnSettings || [], (setting) => {
        if (
          setting &&
          setting.hasOwnProperty('id') &&
          setting.hasOwnProperty('name') &&
          setting.hasOwnProperty('isVisible') &&
          setting.hasOwnProperty('columnMandatory')
        ) {
          const { id, name, isVisible, columnMandatory } = setting;
          if (value.hasOwnProperty('id') && value.hasOwnProperty('isVisible')) {
            return (
              { id, name, isVisible: value.isVisible, columnMandatory } || []
            );
          } else {
            return { id, name, isVisible, columnMandatory } || [];
          }
        } else {
          return [];
        }
      })
    );
    this.columnsMap = this.store.dispatch(new SetColumnSettingsAction(data));
    this.closeDialog('Saved');
  }
  closeDialog(action: string) {
    this.dialogRef.close(action);
  }
  manageCheckboxes({ settings, fieldsSettings, type }) {
    switch (type) {
      case 'checkAll': {
        if (this.checkAll) {
          this.checkAllSource.next(true);
          this.unCheckAllSource.next(false);
          for (const setting of settings) {
            const disableStatus = this.getDisableStatusOfCheckbox({
              id: setting.id,
              fieldsSettings,
            });
            if (setting && !disableStatus) {
              setting.isVisible = true;
            }
          }
        }
        this.checkManagementColumnSettingsSource.next(settings);
        break;
      }
      case 'uncheckAll': {
        if (this.unCheckAll) {
          this.unCheckAllSource.next(true);
          this.checkAllSource.next(false);
          for (const setting of settings) {
            const disableStatus = this.getDisableStatusOfCheckbox({
              id: setting.id,
              fieldsSettings,
            });
            if (setting && !disableStatus) {
              setting.isVisible = false;
            }
          }
        }
        this.checkManagementColumnSettingsSource.next(settings);
        break;
      }
      default:
        break;
    }
  }
  checkCheckAllStatus(settings) {
    const uncheckedArr = _.filter(settings, (item) => {
      return item && !item.isVisible;
    });
    if (!uncheckedArr.length) {
      this.checkAllSource.next(true);
      this.unCheckAllSource.next(false);
    } else if (uncheckedArr.length === settings.length) {
      this.unCheckAllSource.next(true);
      this.checkAllSource.next(false);
    } else {
      this.unCheckAllSource.next(false);
      this.checkAllSource.next(false);
    }
  }
  getDisableStatusOfCheckbox(event): boolean {
    const { id, fieldsSettings } =
      event &&
      event.hasOwnProperty('id') &&
      event.hasOwnProperty('fieldsSettings')
        ? event
        : { id: '', fieldsSettings: {} };
    let fieldsArr = [];
    if (fieldsSettings && fieldsSettings.length) {
      for (const setting of fieldsSettings) {
        if (
          setting &&
          setting.hasOwnProperty('id') &&
          setting.hasOwnProperty('columnMandatory') &&
          setting.id === id
        ) {
          fieldsArr = [...fieldsArr, setting];
        }
      }
      if (fieldsArr && fieldsArr.length) {
        return fieldsArr[0]?.columnMandatory || false;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
