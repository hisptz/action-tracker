import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild,} from '@angular/core';
import * as _ from 'lodash';
import {find} from 'lodash';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {select, Store} from '@ngrx/store';
import {endOfQuarter, endOfYear, isDate, startOfQuarter, startOfYear,} from 'date-fns';
import {Observable} from 'rxjs';
import {generateEvent} from 'src/app/core/helpers/generate-event-payload.helper';
import {getFormattedDate} from 'src/app/core/helpers/generate-formatted-date.helper';
import {generateTEI} from 'src/app/core/helpers/generate-tracked-entity-instance.helper';
import {generateUid} from 'src/app/core/helpers/generate-uid.helper';
import {upsertEnrollmentPayload} from 'src/app/core/helpers/upsert-enrollment-payload.helper';
import {RootCauseAnalysisConfiguration} from 'src/app/core/models/root-cause-analysis-configuration.model';
import {DeleteActionTrackerData, SaveActionTrackerData,} from 'src/app/core/store/actions/action-tracker-data.actions';
import {State} from 'src/app/core/store/reducers';
import {
  getActionTrackerConfigErrorStatus,
  getConfigurationDataElementsFromProgramStageDEs,
  getMergedActionTrackerConfiguration,
  getMergedActionTrackerConfigurationErrors,
  getMergedActionTrackerErrorStatusConfiguration,
} from 'src/app/core/store/selectors/action-tracker-configuration.selectors';
import {
  getActionTrackerDataLoadedStatus,
  getActionTrackingQuarters,
  getAllDataNotification,
  getMergedActionTrackerDatasWithRowspanAttribute,
  getNotificationMessageStatus,
  getOveralLoadingStatus,
  getYearOfCurrentPeriodSelection,
} from 'src/app/core/store/selectors/action-tracker-data.selectors';
import {
  getRootCauseAnalysisDataErrorStatus,
  getRootCauseAnalysisDataHasErrorStatus,
} from 'src/app/core/store/selectors/root-cause-analysis-data.selectors';

import {
  getCanCreateActionProgress,
  getCanCreateActions,
  getCanDeleteActions,
  getCanEditActionProgress,
  getCanEditActions,
} from 'src/app/core/store/selectors/user.selectors';
import {getColumnSettingsData} from 'src/app/core/store/selectors/column-settings.selectors';
import {getConfigurationLoadedStatus} from 'src/app/core/store/selectors/root-cause-analysis-configuration.selectors';
import {DeleteConfirmationDialogueComponent} from 'src/app/shared/components/delete-confirmation-dialogue/delete-confirmation-dialogue.component';
import {FormDialogComponent} from 'src/app/shared/components/form-dialog/form-dialog.component';
import {NotificationSnackbarComponent} from 'src/app/shared/components/notification-snackbar/notification-snackbar.component';
import {generateActionDataValue} from 'src/app/shared/helpers/generate-action-data-values.helper';

import {
  getActionStatusLegendSet,
  LegendSetState,
} from '../../../../shared/modules/selection-filters/modules/legend-set-configuration/store';
import {TableColumnConfigDialogComponent} from 'src/app/shared/dialogs/table-column-config-dialog/table-column-config-dialog.component';
import {take} from 'rxjs/operators';
import {ProgressVisualizationDialogComponent} from '../../components/progress-visualization-dialog/progress-visualization-dialog.component';
import {Visualization} from 'src/app/pages/analysis/modules/ngx-dhis2-visualization/models';
import {getReportVisualizations} from 'src/app/core/store/selectors/report-visualization.selectors';
import {getVisualizationForAction} from '../../helpers/get-visualization-for-action.helper';

@Component({
  selector: 'app-action-table',
  templateUrl: './action-table.component.html',
  styleUrls: ['./action-table.component.css'],
})
export class ActionTableComponent implements OnInit {
  @Input() isActionTracking;
  @ViewChild('tableElement', {static: false})
  table: ElementRef;
  searchText;

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
  reportVisualizations$: Observable<Visualization[]>;
  periodSelection;
  columnSettings$: Observable<any>;
  legendSet$: Observable<any>;

  configurationLoaded$: Observable<boolean>;
  configurationHasError$: Observable<boolean>;
  actionConfigurationHasError$: Observable<boolean>;
  configurationError$: Observable<boolean>;
  dataHasError$: Observable<boolean>;
  dataError$: Observable<boolean>;
  canCreateActions$: Observable<boolean>;
  canEditActions$: Observable<boolean>;
  canCreateActionProgress$: Observable<boolean>;
  canEditActionProgress: boolean;
  canDeleteActions$: Observable<boolean>;
  actionConfigurationLoaded$: Observable<boolean>;

  selectedAction: any;
  initialActionStatus: '';
  toBeDeleted = {};
  selectedStatus: any;
  OBJECT = Object;

  @Output() download: EventEmitter<object> = new EventEmitter<object>();

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
      select(getMergedActionTrackerDatasWithRowspanAttribute())
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

    this.columnSettings$ = this.store.pipe(select(getColumnSettingsData));

    this.notification$ = this.store.select(getAllDataNotification);

    this.dataLoading$ = this.store.select(getOveralLoadingStatus);
    this.dataLoaded$ = this.store.select(getActionTrackerDataLoadedStatus);
    this.store
      .select(getYearOfCurrentPeriodSelection)
      .subscribe((selectedPeriod) => {
        this.periodSelection = selectedPeriod;
      });

    this.configurationHasError$ = this.store.select(
      getMergedActionTrackerErrorStatusConfiguration
    );
    this.configurationError$ = this.store.select(
      getMergedActionTrackerConfigurationErrors
    );

    this.dataHasError$ = this.store.select(
      getRootCauseAnalysisDataHasErrorStatus
    );
    this.dataError$ = this.store.select(getRootCauseAnalysisDataErrorStatus);

    this.configurationLoaded$ = store.select(getConfigurationLoadedStatus);
    this.actionConfigurationHasError$ = store.select(
      getActionTrackerConfigErrorStatus
    );
    this.legendSet$ = this.store.select(getActionStatusLegendSet);

    this.store
      .select(getNotificationMessageStatus)
      .subscribe((notification) => {
        if (notification) {
          this._snackBar.openFromComponent(NotificationSnackbarComponent, {
            duration: 5 * 1000,
            verticalPosition: 'top',
            data: notification.message,
          });
        }
      });

    this.reportVisualizations$ = this.store.pipe(
      select(getReportVisualizations)
    );

    this.canCreateActions$ = this.store.select(getCanCreateActions);
    this.canEditActions$ = this.store.select(getCanEditActions);
    this.canCreateActionProgress$ = this.store.select(
      getCanCreateActionProgress
    );
    this.store.select(getCanEditActionProgress).subscribe((permission) => {
      this.canEditActionProgress = permission;
    });
    this.canDeleteActions$ = this.store.select(getCanDeleteActions);
  }

  ngOnInit() {
  }

  getDataValueLength(data, actionDataItem): number {
    let rootCauseDataIds = [];
    if (data && data.length) {
      for (const dataItem of data) {
        rootCauseDataIds =
          dataItem && dataItem.rootCauseDataId
            ? _.uniq([...rootCauseDataIds, dataItem.rootCauseDataId])
            : [...[], rootCauseDataIds];
      }
      const rootCauseId =
        actionDataItem && actionDataItem.rootCauseDataId
          ? actionDataItem.rootCauseDataId || ''
          : '';
      const newIndex = rootCauseDataIds.indexOf(rootCauseId) + 1 || 0;
      return newIndex;
    }

    return 0;
  }

  toggleTruncationStatus(actionDataItem) {
    actionDataItem.truncateStatus = !actionDataItem.truncateStatus;
  }

  onEditActionTracking(e, dataItem, actionTrackingItem, dataElements) {
    if (
      !this.isActionTracking ||
      (this.isActionTracking && this.canEditActionProgress)
    ) {
      this.selectedAction = dataItem;
      this.initialActionStatus = actionTrackingItem.actionStatus;
      this.dataEntryDialogBoxOperations(dataElements, actionTrackingItem);
    }
  }

  onEditAction(e, dataItem: any, dataElements: any[]) {
    e.stopPropagation();
    this.dataEntryDialogBoxOperations(dataElements, dataItem);
  }

  getTableElement() {
    return this.table ? this.table.nativeElement : null;
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
          _.find(dataElements, {name: 'orgUnitId'}),
          'id'
        )}]`
      ),
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
        dataValues: dataItem.dataValues || dataItem,
        minDate: this.isActionTracking
          ? startOfQuarter(dataItem.dateOfQuarter)
          : startOfYear(new Date(this.periodSelection)),
        maxDate: this.isActionTracking
          ? endOfQuarter(dataItem.dateOfQuarter)
          : endOfYear(new Date(this.periodSelection)),
      },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((formResponse) => {
      if (formResponse && !this.isActionTracking) {
        const {formValues, formAction} = formResponse;
        dataItem.attributes = this.generateAttributePayload(
          formValues,
          formDataElements
        );
      } else if (this.selectedAction && formResponse && this.isActionTracking) {
        const {formValues, formAction} = formResponse;
        const eventPayload = this.createEventPayload(
          dataItem,
          formValues,
          formDataElements
        );

        const enrollmentPayload = upsertEnrollmentPayload(
          _.head(this.selectedAction.enrollments),
          eventPayload
        );
        this.selectedAction = {
          ...this.selectedAction,
          enrollments: [enrollmentPayload],
        };
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
        code: _.get(_.find(formDataElements, {id: index}), 'code'),
        value: isDate(formValue) ? getFormattedDate(formValue) : formValue,
      });
    });
    return attributes;
  }

  sanitizeActionTrackingData(selectedAction, formValues, formDataElements) {
    const eventDataValues = [];
    const eventData: any = {};
    _.forEach(formDataElements, (formDataElement) =>
      formDataElement.id
        ? eventDataValues.push({
          dataElement: formDataElement.id,
          value: formValues[formDataElement.id],
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
      _.find(formDataElements, {isActionStatus: true}),
      'id'
    );
    const eventData = this.sanitizeActionTrackingData(
      this.selectedAction,
      formValues,
      formDataElements
    );
    const currentActionStatus = _.get(
      _.find(eventData.eventDataValues, {dataElement: actionStatusId}),
      'value'
    );
    eventData.eventId = dataItem.eventId;

    return generateEvent(this.selectedAction, eventData);
  }

  onDeleteAction(event, dataItem, dataElements) {
    if (event) {
      event.stopPropagation();
    }
    let actionDescription = _.find(
      dataElements || [],
      (element) => element.formControlName === 'actionDescription'
    );
    const value =
      actionDescription && actionDescription.hasOwnProperty('id')
        ? dataItem.dataValues[actionDescription.id] || ''
        : '';
    actionDescription = {...actionDescription, value};
    const dialogRef = this.dialog.open(DeleteConfirmationDialogueComponent, {
      width: '600px',
      height: `${150 + 55 * 1}px`,
      data: actionDescription,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((formResponse) => {
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

  openColumnConfigDialog(settings) {
    const dialogRef = this.dialog.open(TableColumnConfigDialogComponent, {
      width: '600px',
      height: '850px',
      data: settings,
      disableClose: true,
    });
    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((result) => {
        if (result === 'Saved') {
          this._snackBar.open(
            'Column Settings configured successfully!',
            'Close',
            {
              duration: 2000,
            }
          );
        }
      });
  }

  onDownload(e, downloadType, allowIds) {
    e.stopPropagation();
    this.data$.pipe(take(1)).subscribe((data) => {
      this.download.emit({downloadType, data, allowIds});
    });
  }

  onChangeStatus(e, actionStatuses: any) {
    if (e) {
      this.selectedStatus = (actionStatuses || []).find(
        (status: any) => status.id === e.value
      );
      this.data$ = this.store.select(
        getMergedActionTrackerDatasWithRowspanAttribute(this.selectedStatus)
      );
    }
  }

  onClearStatus(e) {
    e.stopPropagation();
  }

  onViewProgress(
    e,
    visualizations: Visualization[],
    dataItem: any,
    configurationDataElements: any[]
  ) {
    e.stopPropagation();
    const indicatorConfig = find(configurationDataElements || [], [
      'name',
      'indicatorId',
    ]);
    const interventionConfig = find(configurationDataElements || [], [
      'name',
      'interventionId',
    ]);
    const indicatorId =
      dataItem && dataItem.dataValues
        ? dataItem.dataValues[indicatorConfig ? indicatorConfig.id : '']
        : undefined;

    const interventionId =
      dataItem && dataItem.dataValues
        ? dataItem.dataValues[interventionConfig ? interventionConfig.id : '']
        : undefined;

    const visualization = getVisualizationForAction(visualizations, {
      interventionId,
      indicatorId,
    });

    if (visualization) {
      const width = visualization.uiConfig ? visualization.uiConfig.width : 0;
      this.dialog.open(ProgressVisualizationDialogComponent, {
        width: width + 'px',
        data: {visualization},
        disableClose: true,
      });
    }
  }
}
