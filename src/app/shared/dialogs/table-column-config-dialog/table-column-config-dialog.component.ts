import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { RootCauseAnalysisConfiguration } from 'src/app/core/models/root-cause-analysis-configuration.model';
import { Store } from '@ngrx/store';
import { State } from 'src/app/core/store/reducers';
import { getMergedActionTrackerConfiguration } from 'src/app/core/store/selectors/action-tracker-configuration.selectors';
import { FormGroup, FormBuilder } from '@angular/forms';
import { take } from 'rxjs/operators';
import * as _ from 'lodash';
import { SetColumnSettingsAction } from 'src/app/core/store/actions/columns-settings.actions';
import {
  getColumnSettingsData,
  getColumnSettingsInitialData,
} from 'src/app/core/store/selectors/column-settings.selectors';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-table-column-config-dialog',
  templateUrl: './table-column-config-dialog.component.html',
  styleUrls: ['./table-column-config-dialog.component.css'],
})
export class TableColumnConfigDialogComponent implements OnInit {
  configuration$: Observable<RootCauseAnalysisConfiguration>;
  columnsMap;
  columnSettings$: Observable<any>;
  checkAll;
  unCheckAll;
  checkSettings = {
    checkAll: true,
    uncheckAll: false,
  };
  constructor(
    private store: Store<State>,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TableColumnConfigDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.initilizeData();
  }
  initilizeData() {
    this.checkInitialCheckStatus();
    this.configuration$ = this.store.select(
      getMergedActionTrackerConfiguration
    );
    this.columnSettings$ = this.store.select(getColumnSettingsInitialData);
  }
  checkInitialCheckStatus() {
    const uncheckedArr = _.filter(Object.keys(this.data), (item) => {
      return item && !this.data[item];
    });
    if (!uncheckedArr.length) {
      this.checkAll = true;
      this.unCheckAll = false;
    } else if (uncheckedArr.length === Object.keys(this.data).length) {
      this.unCheckAll = true;
      this.checkAll = false;
    } else {
      this.unCheckAll = false;
      this.checkAll = false;
    }
  }
  saveColumns(form, columnSettings) {
    const { value } = form;

    const data = _.flattenDeep(
      _.map(columnSettings || [], (setting) => {
        if (
          setting &&
          setting.hasOwnProperty('id') &&
          setting.hasOwnProperty('isVisible') &&
          setting.hasOwnProperty('columnMandatory')
        ) {
          const { id, isVisible, columnMandatory } = setting;
          if (value.hasOwnProperty('id') && value.hasOwnProperty('isVisible')) {
            return { id, isVisible: value.isVisible, columnMandatory } || [];
          } else {
            return { id, isVisible, columnMandatory } || [];
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
  manageCheckboxes(settings, type) {
    switch (type) {
      case 'checkAll': {
        if (this.checkAll) {
          this.unCheckAll = false;
          for (const setting of settings) {
            if (setting && !setting.columnMandatory) {
              setting.isVisible = true;
            }
          }
        }
        break;
      }
      case 'uncheckAll': {
        if (this.unCheckAll) {
          this.checkAll = false;
          for (const setting of settings) {
            if (setting && !setting.columnMandatory) {
              setting.isVisible = false;
            }
          }
        }
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
      this.checkAll = true;
      this.unCheckAll = false;
    } else if (uncheckedArr.length === settings.length) {
      this.unCheckAll = true;
      this.checkAll = false;
    } else {
      this.unCheckAll = false;
      this.checkAll = false;
    }
  }
}
