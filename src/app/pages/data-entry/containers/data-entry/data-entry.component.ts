import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { generateUid } from 'src/app/core/helpers/generate-uid.helper';
import { MatMenuTrigger } from '@angular/material';

import { RootCauseAnalysisConfiguration } from 'src/app/core/models/root-cause-analysis-configuration.model';
import { State } from 'src/app/core/store/reducers';
import {
  getMergedActionTrackerConfiguration,
  getConfigurationDataElementsFromProgramStageDEs
} from 'src/app/core/store/selectors/action-tracker-configuration.selectors';
import { getMergedActionTrackerDatasWithRowspanAttribute } from 'src/app/core/store/selectors/action-tracker-data.selectors';
import { FormDialogComponent } from 'src/app/shared/components/form-dialog/form-dialog.component';
import { generateActionDataValue } from 'src/app/shared/helpers/generate-action-data-values.helper';
import { generateTEI } from 'src/app/core/helpers/generate-tracked-entity-instance.helper';
import { generateEvent } from 'src/app/core/helpers/generate-event-payload.helper';
import { getFormattedDate } from 'src/app/core/helpers/generate-formatted-date.helper';
import { upsertEnrollmentPayload } from 'src/app/core/helpers/upsert-enrollment-payload.helper';

import {
  LegendSetState,
  getActionStatusLegendSet
} from '../../../../shared/modules/selection-filters/modules/legend-set-configuration/store';

import {
  SaveActionTrackerData,
  DeleteActionTrackerData
} from 'src/app/core/store/actions/action-tracker-data.actions';
import * as _ from 'lodash';
import { isDate } from 'date-fns';
@Component({
  selector: 'app-data-entry',
  templateUrl: './data-entry.component.html',
  styleUrls: ['./data-entry.component.css']
})
export class DataEntryComponent implements OnInit {
  @Input() isActionTracking;
  configuration$: Observable<RootCauseAnalysisConfiguration>;
  data$: Observable<any[]>;
  programStageConfiguration$: Observable<any[]>;
  actionTrackingData$: Observable<any[]>;
  legendSetStatus$: Observable<any>;
  legendSetItems$: Observable<any>;
  selectedAction: any;
  initialActionStatus: '';
  toBeDeleted = {};

  @ViewChild(MatMenuTrigger, { static: false })
  contextMenu: MatMenuTrigger;

  contextMenuPosition = { x: '0px', y: '0px' };

  constructor(
    private store: Store<State>,
    private legendSetStore: Store<LegendSetState>,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.configuration$ = this.store.select(
      getMergedActionTrackerConfiguration
    );
    this.data$ = this.store.pipe(
      select(getMergedActionTrackerDatasWithRowspanAttribute)
    );
    this.programStageConfiguration$ = this.store.pipe(
      select(getConfigurationDataElementsFromProgramStageDEs)
    );

    this.legendSetStatus$ = this.legendSetStore.select(
      getActionStatusLegendSet
    );
  }

  onEditActionTracking(e, dataItem, actionTrackingItem, dataElements) {
    this.selectedAction = dataItem;
    this.initialActionStatus = actionTrackingItem.actionStatus;
    actionTrackingItem.isCurrentQuater ||
    (!actionTrackingItem.hasEvents && !actionTrackingItem.isCurrentQuater)
      ? this.dataEntryDialogBoxOperations(dataElements, actionTrackingItem)
      : console.log('dont open dialogue');
  }
  onEditAction(e, dataItem: any, dataElements: any[]) {
    e.stopPropagation();
    if (!this.isActionTracking) {
      this.dataEntryDialogBoxOperations(dataElements, dataItem);
    }
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
        dataValues: dataItem.dataValues || dataItem
      }
    });

    dialogRef.afterClosed().subscribe(formResponse => {
      if (formResponse && !this.isActionTracking) {
        const { formValues, formAction } = formResponse;
        dataItem.attributes = this.generateAttributePayload(
          formValues,
          formDataElements
        );
      } else if (this.selectedAction && formResponse && this.isActionTracking) {
        const { formValues, formAction } = formResponse;
        const eventPayload = this.createEventPayload(
          dataItem,
          formValues,
          formDataElements
        );

        upsertEnrollmentPayload(
          _.head(this.selectedAction.enrollments),
          eventPayload
        );
      }

      const actionTrackerData = generateTEI(
        this.isActionTracking ? this.selectedAction : dataItem
      );

      this.store.dispatch(new SaveActionTrackerData(actionTrackerData));
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

  sanitizeActionTrackingData(selectedAction, formValues, formDataElements) {
    const eventDataValues = [];
    const eventData: any = {};
    _.forEach(formDataElements, formDataElement =>
      formDataElement.id
        ? eventDataValues.push({
            dataElement: formDataElement.id,
            value: formValues[formDataElement.id]
          })
        : _.set(
            eventData,
            'eventDate',
            isDate(formValues[formDataElement.formControlName])
              ? getFormattedDate(formValues[formDataElement.formControlName])
              : formValues[formDataElement.formControlName]
          )
    );
    eventData.eventDataValues = eventDataValues;
    return eventData;
  }

  createEventPayload(dataItem, formValues, formDataElements) {
    const actionStatusId = _.get(
      _.find(formDataElements, { isActionStatus: true }),
      'id'
    );
    const eventData = this.sanitizeActionTrackingData(
      this.selectedAction,
      formValues,
      formDataElements
    );
    const currentActionStatus = _.get(
      _.find(eventData.eventDataValues, { dataElement: actionStatusId }),
      'value'
    );
    eventData.eventId = dataItem.id;
    return currentActionStatus == this.initialActionStatus
      ? generateEvent(this.selectedAction, eventData)
      : generateEvent(this.selectedAction, eventData, true);
  }

  onContextMenu(event: MouseEvent, item, configuration) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = {
      dataItem: item,
      configuration: configuration
    };
    this.contextMenu.menu.focusFirstItem('mouse');
    this.contextMenu.openMenu();
  }

  onDeleteAction(event, dataItem) {
    this.dataEntryDialogBoxOperations([], []);
    // const dataItemToDelete = document.getElementById(dataItem.id);
    // if (dataItemToDelete) {
    //   const dataItemColumns = dataItemToDelete.querySelectorAll(
    //     '.action-tracker-column, .solution-column'
    //   );
    //   _.map(dataItemColumns, dataItemColumn => {
    //     dataItemColumn.hasAttribute('rowspan')
    //       ? null
    //       : dataItemColumn.setAttribute('hidden', 'true');
    //   });
    //   this.toBeDeleted[dataItem.id] = true;
    // }
  }

  onConfirmDeleteAction(event, dataItem) {
    if (dataItem && dataItem.trackedEntityInstance) {
      this.store.dispatch(
        new DeleteActionTrackerData(dataItem.trackedEntityInstance)
      );
    } else {
      window.alert('There is no action registered for this solution yet.');
    }
  }
}
