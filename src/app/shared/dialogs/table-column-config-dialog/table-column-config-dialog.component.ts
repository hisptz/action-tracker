import { Component, OnInit } from '@angular/core';
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
  getColumnSettingsInitialData
} from 'src/app/core/store/selectors/column-settings.selectors';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-table-column-config-dialog',
  templateUrl: './table-column-config-dialog.component.html',
  styleUrls: ['./table-column-config-dialog.component.css']
})
export class TableColumnConfigDialogComponent implements OnInit {
  configuration$: Observable<RootCauseAnalysisConfiguration>;
  columnsMap;
  columnSettings$: Observable<any>;

  constructor(
    private store: Store<State>,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TableColumnConfigDialogComponent>
  ) {}

  ngOnInit() {
    this.initilizeData();
  }
  initilizeData() {
    this.configuration$ = this.store.select(
      getMergedActionTrackerConfiguration
    );
    this.columnSettings$ = this.store.select(getColumnSettingsInitialData);
  }
  saveColumns(form) {
    const { value } = form;
    const data = _.map(Object.entries(value), valueArr => {
      const key = valueArr[0];
      if (valueArr[1] === false) {
        return { id: key, isVisible: false };
      } else {
        return { id: key, isVisible: true };
      }
    });
    this.columnsMap = this.store.dispatch(new SetColumnSettingsAction(data));
  }
  closeDialog() {
    // this.initilizeData();
    this.dialogRef.close();
  }
}
