import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { generateUid } from 'src/app/core/helpers/generate-uid.helper';
import { RootCauseAnalysisConfiguration } from 'src/app/core/models/root-cause-analysis-configuration.model';
import { State } from 'src/app/core/store/reducers';
import { getMergedActionTrackerConfiguration } from 'src/app/core/store/selectors/action-tracker-configuration.selectors';
import { getMergedActionTrackerDatasWithRowspanAttribute } from 'src/app/core/store/selectors/action-tracker-data.selectors';
import { FormDialogComponent } from 'src/app/shared/components/form-dialog/form-dialog.component';
import { generateActionDataValue } from 'src/app/shared/helpers/generate-action-data-values.helper';

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
  }

  onAddAction(e, dataItem: any, dataElements: any[]) {
    e.stopPropagation();
    const emptyDataValues = generateActionDataValue(dataElements, dataItem);
    const newDataItem = {
      trackedEntityInstance: generateUid(),
      dataValues: emptyDataValues,
      isNewRow: true,
      rootCauseDataId: dataItem.rootCauseDataId,
      parentAction: dataItem.id
    };

    const formDataElements = (dataElements || []).filter(
      (dataElement: any) => dataElement.isActionTrackerColumn
    );

    const dialogRef = this.dialog.open(FormDialogComponent, {
      width: '600px',
      height: `${300 + 55 * formDataElements.length}px`,
      data: {
        dataElements: formDataElements,
        dataValues: newDataItem.dataValues
      }
    });

    dialogRef.afterClosed().subscribe(({ formValues, formAction }) => {
      console.log(formValues);
    });
  }
}
