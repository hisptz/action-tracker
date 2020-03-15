import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { generateUid } from 'src/app/core/helpers/generate-uid.helper';
import { MatMenuTrigger } from '@angular/material';
import { MatSnackBar } from '@angular/material/snack-bar';

import { RootCauseAnalysisConfiguration } from 'src/app/core/models/root-cause-analysis-configuration.model';
import { State } from 'src/app/core/store/reducers';
import {
  getMergedActionTrackerConfiguration,
  getConfigurationDataElementsFromProgramStageDEs
} from 'src/app/core/store/selectors/action-tracker-configuration.selectors';
import { getConfigurationLoadedStatus } from 'src/app/core/store/selectors/root-cause-analysis-configuration.selectors';
import {
  getAllDataNotification,
  getNotificationMessageStatus,
  getOveralLoadingStatus,
  getActionTrackerDataLoadedStatus,
  getMergedActionTrackerDatasWithRowspanAttribute,
  getActionTrackingQuarters,
  getYearOfCurrentPeriodSelection
} from 'src/app/core/store/selectors/action-tracker-data.selectors';
import { FormDialogComponent } from 'src/app/shared/components/form-dialog/form-dialog.component';
import { DeleteConfirmationDialogueComponent } from 'src/app/shared/components/delete-confirmation-dialogue/delete-confirmation-dialogue.component';
import { NotificationSnackbarComponent } from 'src/app/shared/components/notification-snackbar/notification-snackbar.component';
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

import {
  isDate,
  startOfQuarter,
  endOfQuarter,
  startOfYear,
  endOfYear
} from 'date-fns';
@Component({
  selector: 'app-action-table',
  templateUrl: './action-table.component.html',
  styleUrls: ['./action-table.component.css']
})
export class ActionTableComponent implements OnInit {
  @Input() isActionTracking;
  configuration$: Observable<RootCauseAnalysisConfiguration>;
  data$: Observable<any[]>;
  programStageConfiguration$: Observable<any[]>;
  actionTrackingQuarters$: Observable<any[]>;
  actionTrackingData$: Observable<any[]>;
  legendSetStatus$: Observable<any>;
  legendSetItems$: Observable<any>;
  notification$: Observable<any>;
  dataLoading$: Observable<boolean>;
  dataLoaded$: Observable<boolean>;
  periodSelection;

  configurationLoaded$: Observable<boolean>;

  selectedAction: any;
  initialActionStatus: '';
  toBeDeleted = {};

  constructor(
    private store: Store<State>,
    private legendSetStore: Store<LegendSetState>,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
    this.configuration$ = this.store.select(
      getMergedActionTrackerConfiguration
    );
    this.data$ = this.store.pipe(
      select(getMergedActionTrackerDatasWithRowspanAttribute)
    );

    this.programStageConfiguration$ = this.store.pipe(
      select(getConfigurationDataElementsFromProgramStageDEs)
    );

    this.actionTrackingQuarters$ = this.store.pipe(
      select(getActionTrackingQuarters)
    );

    this.legendSetStatus$ = this.legendSetStore.select(
      getActionStatusLegendSet
    );

    this.notification$ = this.store.select(getAllDataNotification);

    this.dataLoading$ = this.store.select(getOveralLoadingStatus);
    this.dataLoaded$ = this.store.select(getActionTrackerDataLoadedStatus);
    this.store
      .select(getYearOfCurrentPeriodSelection)
      .subscribe(selectedPeriod => {
        this.periodSelection = selectedPeriod;
      });

    this.configurationLoaded$ = store.select(getConfigurationLoadedStatus);

    this.store.select(getNotificationMessageStatus).subscribe(notification => {
      if (notification) {
        this._snackBar.openFromComponent(NotificationSnackbarComponent, {
          duration: 5 * 1000,
          verticalPosition: 'top',
          data: notification.message
        });
      }
    });
  }

  ngOnInit() {}

  toggleTruncationStatus(actionDataItem) {
    actionDataItem.truncateStatus = !actionDataItem.truncateStatus;
  }
  onEditActionTracking(e, dataItem, actionTrackingItem, dataElements) {
    this.selectedAction = dataItem;
    this.initialActionStatus = actionTrackingItem.actionStatus;
    this.dataEntryDialogBoxOperations(dataElements, actionTrackingItem);
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
    console.log(dataItem);
    const dialogRef = this.dialog.open(FormDialogComponent, {
      width: '600px',
      height: `${300 + 55 * formDataElements.length}px`,
      data: {
        dataElements: formDataElements,
        dataValues: dataItem.dataValues || dataItem,
        minDate: this.isActionTracking
          ? startOfQuarter(dataItem.dateOfQuarter)
          : startOfYear(new Date(this.periodSelection)),
        maxDate: this.isActionTracking
          ? endOfQuarter(dataItem.dateOfQuarter)
          : endOfYear(new Date(this.periodSelection))
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

      formResponse
        ? this.store.dispatch(new SaveActionTrackerData(actionTrackerData))
        : null;
    });
  }
  generateAttributePayload(formValues, formDataElements) {
    const attributes = [];
    _.forEach(formValues, (formValue, index) => {
      attributes.push({
        attribute: index,
        code: _.get(_.find(formDataElements, { id: index }), 'code'),
        value: isDate(formValue) ? getFormattedDate(formValue) : formValue
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
    eventData.eventId = dataItem.eventId;
    return currentActionStatus == this.initialActionStatus
      ? generateEvent(this.selectedAction, eventData)
      : generateEvent(this.selectedAction, eventData, true);
  }

  onDeleteAction(event, dataItem) {
    if (event) {
      event.stopPropagation();
    }

    const dialogRef = this.dialog.open(DeleteConfirmationDialogueComponent, {
      width: '600px',
      height: `${100 + 55 * 1}px`,
      data: {}
    });

    dialogRef.afterClosed().subscribe(formResponse => {
      if (formResponse.action == 'DELETE') {
        this.onConfirmDeleteAction(dataItem);
      }
    });
  }

  onConfirmDeleteAction(dataItem) {
    if (dataItem && dataItem.trackedEntityInstance) {
      this.store.dispatch(
        new DeleteActionTrackerData(dataItem.trackedEntityInstance)
      );
    } else {
      window.alert('There is no action registered for this solution yet.');
    }
  }
}
