import { Component, OnInit, Attribute } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { generateUid } from 'src/app/core/helpers/generate-uid.helper';
import { RootCauseAnalysisConfiguration } from 'src/app/core/models/root-cause-analysis-configuration.model';
import { State } from 'src/app/core/store/reducers';
import { getMergedActionTrackerConfiguration } from 'src/app/core/store/selectors/action-tracker-configuration.selectors';
import {
  getMergedActionTrackerDatasWithRowspanAttribute,
  getMergedActionTrackerDatas
} from 'src/app/core/store/selectors/action-tracker-data.selectors';
import { FormDialogComponent } from 'src/app/shared/components/form-dialog/form-dialog.component';
import { generateActionDataValue } from 'src/app/shared/helpers/generate-action-data-values.helper';
import { generateTEI } from 'src/app/core/helpers/generate-tracked-entity-instance.helper';

import { SaveActionTrackerData } from 'src/app/core/store/actions/action-tracker-data.actions';
import * as _ from 'lodash';
@Component({
  selector: 'app-data-entry',
  templateUrl: './data-entry.component.html',
  styleUrls: ['./data-entry.component.css']
})
export class DataEntryComponent implements OnInit {
  configuration$: Observable<RootCauseAnalysisConfiguration>;
  data$: Observable<any[]>;
  constructor(private store: Store<State>, private dialog: MatDialog) {}

  ngOnInit() {
    this.configuration$ = this.store.select(
      getMergedActionTrackerConfiguration
    );

    this.data$ = this.store.pipe(
      select(getMergedActionTrackerDatasWithRowspanAttribute)
    );

    this.store.pipe(select(getMergedActionTrackerDatas)).subscribe();
  }

  onEditAction(e, dataItem: any, dataElements: any[]) {
    e.stopPropagation();

    this.dataEntryDialogBoxOperations(dataElements, dataItem);
  }

  onAddAction(e, dataItem: any, dataElements: any[]) {
    e.stopPropagation();
    const emptyDataValues = generateActionDataValue(dataElements, dataItem);
    const newDataItem: any = {
      trackedEntityInstance: generateUid(),
      dataValues: emptyDataValues,
      isNewRow: true,
      rootCauseDataId: dataItem.rootCauseDataId,
      parentAction: dataItem.id,
      orgUnit: _.get(
        dataItem,
        `dataValues[${_.get(
          _.find(dataElements, { name: 'orgUnitId' }),
          'id'
        )}]`
      )
    };

    this.dataEntryDialogBoxOperations(dataElements, newDataItem);
  }

  dataEntryDialogBoxOperations(dataElements, dataItem) {
    const formDataElements = (dataElements || []).filter(
      (dataElement: any) => dataElement.isActionTrackerColumn
    );

    const dialogRef = this.dialog.open(FormDialogComponent, {
      width: '600px',
      height: `${300 + 55 * formDataElements.length}px`,
      data: {
        dataElements: formDataElements,
        dataValues: dataItem.dataValues
      }
    });

    dialogRef.afterClosed().subscribe(formResponse => {
      if (formResponse) {
        const { formValues, formAction } = formResponse;
        dataItem.attributes = this.generateAttributePayload(
          formValues,
          formDataElements
        );
        const actionTrackerData = generateTEI(dataItem);
        this.store.dispatch(new SaveActionTrackerData(actionTrackerData));
      }
    });
  }
  generateAttributePayload(formValues, formDataElements) {
    const attributes = [];
    _.forEach(formValues, (formValue, index) => {
      attributes.push({
        attribute: index,
        code: _.get(_.find(formDataElements, { id: index }), 'code'),
        value: formValue
      });
    });
    return attributes;
  }
}
