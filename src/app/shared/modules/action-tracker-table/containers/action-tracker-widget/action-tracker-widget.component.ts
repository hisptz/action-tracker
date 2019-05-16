import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import {
  style,
  state,
  animate,
  transition,
  trigger
} from '@angular/animations';

import { listEnterAnimation } from '../../../../animations/list-enter-animation';

import { Store } from '@ngrx/store';
import { ActionTrackerWidgetState } from '../../store';
import { Observable, of } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import * as _ from 'lodash';
import * as fromHelpers from '../../helpers';
import * as fromModels from '../../store/models';
import * as fromRootCauseAnalysisDataActions from '../../../../../core/store/actions/root-cause-analysis-data.actions';
import { RootCauseAnalysisData } from '../../store/models';

import { DownloadWidgetService } from '../../services/downloadWidgetService.service';
import { getCurrentRootCauseAnalysisWidget } from '../../store/selectors/root-cause-analysis-widget.selectors';
import {
  getCurrentRootCauseAnalysisConfiguration,
  getConfigurationLoadingStatus,
  getConfigurationLoadedStatus
} from 'src/app/core/store/selectors/root-cause-analysis-configuration.selectors';
import {
  getAllRootCauseAnalysisData,
  getRootCauseAnalysisDataLoadedStatus,
  getRootCauseAnalysisDataLoadingStatus,
  getRootCauseAnalysisDataNotificationStatus
} from 'src/app/core/store/selectors/root-cause-analysis-data.selectors';
import { State } from 'src/app/core/store/reducers';

import {
  getCurrentActionTrackerConfig,
  mergeCurrentActionTrackerConfigWithCurrentRootCauseConfig
} from 'src/app/core/store/selectors/action-tracker-configuration.selectors';
@Component({
  selector: 'app-bna-widget',
  templateUrl: './action-tracker-widget.component.html',
  styleUrls: ['./action-tracker-widget.component.css'],
  animations: [
    listEnterAnimation,
    trigger('fadeInOut', [
      transition(':enter', [
        // :enter is alias to 'void => *'
        style({ opacity: 0 }),
        animate(500, style({ opacity: 1 }))
      ]),
      transition(':leave', [
        // :leave is alias to '* => void'
        animate(500, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class ActionTrackerWidgetComponent implements OnInit {
  @Input()
  routerParams;
  @Input()
  selectedOrgUnit;
  @Input()
  selectedPeriod;

  @ViewChild('rootCauseAnalysisTable')
  table: ElementRef;

  configuration$: Observable<fromModels.RootCauseAnalysisConfiguration>;
  widget$: Observable<fromModels.RootCauseAnalysisWidget>;
  data$: Observable<fromModels.RootCauseAnalysisData[]>;
  actionTrackerConfiguration$: Observable<any>;
  configurationLoading$: Observable<boolean>;
  configurationLoaded$: Observable<boolean>;
  dataLoading$: Observable<boolean>;
  dataLoaded$: Observable<boolean>;
  notification$: Observable<any>;
  // savingColor$: Observable<string>;

  newRootCauseAnalysisData: fromModels.RootCauseAnalysisData;
  showContextMenu = false;
  contextmenuDataItem: RootCauseAnalysisData;
  contextmenuX: any;
  contextmenuY: any;
  confirmDelete = false;
  unSavedDataItemValues: any;
  /**
   * key value pair object for each row to show/hide during deletion
   */
  toBeDeleted = {};

  constructor(
    private store: Store<State>,
    private downloadWidgetService: DownloadWidgetService
  ) {
    this.widget$ = store.select(getCurrentRootCauseAnalysisWidget);
    this.configuration$ = store.select(
      mergeCurrentActionTrackerConfigWithCurrentRootCauseConfig
    );
    this.actionTrackerConfiguration$ = store.select(
      getCurrentActionTrackerConfig
    );
    this.data$ = store.select(getAllRootCauseAnalysisData);
    this.configurationLoading$ = store.select(getConfigurationLoadingStatus);
    this.configurationLoaded$ = store.select(getConfigurationLoadedStatus);
    this.dataLoaded$ = store.select(getRootCauseAnalysisDataLoadedStatus);
    this.dataLoading$ = store.select(getRootCauseAnalysisDataLoadingStatus);
    this.notification$ = store.select(
      getRootCauseAnalysisDataNotificationStatus
    );

    this.unSavedDataItemValues = {};

    this.data$
      .pipe(
        switchMap((data: any) =>
          this.configuration$.pipe(
            map((config: any) => {
              return { config, lastData: _.last(data) };
            })
          )
        )
      )
      .subscribe((dataDetails: any) => {
        of(dataDetails);
      });
  }

  ngOnInit() {}

  onUpdateRootCauseAnalysisData(rootCauseAnalysisData: any) {
    rootCauseAnalysisData.isActive = !rootCauseAnalysisData.isActive;
    this.store.dispatch(
      new fromRootCauseAnalysisDataActions.SaveRootCauseAnalysisData(
        rootCauseAnalysisData
      )
    );
  }

  onAddRootCauseAnalysisData(rootCauseAnalysisData: any) {
    this.store.dispatch(
      new fromRootCauseAnalysisDataActions.CreateRootCauseAnalysisData(
        rootCauseAnalysisData
      )
    );
  }

  downloadTable(downloadFormat) {
    if (this.table) {
      const dateTime = new Date();
      const el = this.table.nativeElement;
      const filename =
        'Root causes - ' +
        this.routerParams.dashboard.name +
        ' - ' +
        this.selectedOrgUnit +
        ' - ' +
        this.selectedPeriod +
        ' gen. on ' +
        dateTime.getFullYear() +
        (dateTime.getMonth() + 1 < 10 ? '-0' : '-') +
        (dateTime.getMonth() + 1) +
        (dateTime.getDay() < 10 ? '-0' : '-') +
        dateTime.getDay() +
        ' ' +
        (dateTime.getHours() < 10 ? ':0' : ':') +
        dateTime.getHours() +
        (dateTime.getMinutes() < 10 ? ':0' : ':') +
        dateTime.getMinutes() +
        'hrs';
      if (downloadFormat === 'XLSX') {
        if (el) {
          this.downloadWidgetService.exportXLS(filename, el.outerHTML);
        }
      }
    }
  }

  openActionTrackerEntryForm(event, dataItem) {
    const dataItemRowElement = document.getElementById(`${dataItem.id}`);
    const actionTrackerItems = dataItemRowElement.getElementsByClassName(
      'action-tracker-column'
    );
    _.map(actionTrackerItems, (actionTrackerColumn, index) => {
      if (index !== actionTrackerItems.length - 1) {
        actionTrackerColumn.setAttribute('hidden', true);
      } else {
        actionTrackerColumn.colSpan = _.toString(actionTrackerItems.length);
        const buttonElement = _.head(
          actionTrackerColumn.getElementsByClassName('btn-add-action')
        );

        const formElement = _.head(
          actionTrackerColumn.getElementsByClassName(
            'action-tracker-form-wrapper'
          )
        );
        buttonElement.setAttribute('hidden', true);
        formElement.removeAttribute('hidden');
      }
    });
  }

  onDeleteRootCauseAnalysisData(rootCauseAnalysisData: any) {
    this.store.dispatch(
      new fromRootCauseAnalysisDataActions.DeleteRootCauseAnalysisData(
        rootCauseAnalysisData
      )
    );
  }

  onToggleAddNewRootCauseAnalysisData(configuration) {
    const configurationDataElements = configuration.dataElements;
    const emptyDataValues = this.generateConfigurations(
      configurationDataElements
    );

    this.store.dispatch(
      new fromRootCauseAnalysisDataActions.AddRootCauseAnalysisData({
        id: fromHelpers.generateUid(),
        isActive: true,
        isNew: true,
        configurationId: configuration.id,
        dataValues: emptyDataValues
      })
    );
  }

  generateConfigurations(configurationDataElements) {
    let dataValues: any = {};
    configurationDataElements.forEach((element, i) => {
      dataValues[element.id] = '';
    });
    return dataValues;
  }

  onToggleEdit(dataItemObject, dataItem?) {
    this.showContextMenu = false;
    this.store.dispatch(
      new fromRootCauseAnalysisDataActions.UpdateRootCauseAnalysisData({
        ...dataItemObject,
        ...dataItem,
        isActive: true
      })
    );
  }

  onToggleCancelAction(e, dataItem, action?: string) {
    if (e) {
      e.stopPropagation();
    }
    this.toBeDeleted[dataItem.id] = false;
    this.store.dispatch(
      new fromRootCauseAnalysisDataActions.UpdateRootCauseAnalysisData({
        ...dataItem,
        showDeleteConfirmation:
          action === 'DELETE' ? false : dataItem.showDeleteConfirmation,
        isActive: false
      })
    );
  }

  onEnableContextMenu(e, dataItem) {
    if (dataItem.isActive !== true) {
      if (e) {
        e.stopPropagation();
      }
      e.cancelBubble = true;
      this.contextmenuX = e.clientX;
      this.contextmenuY = e.clientY - 20;
      this.contextmenuDataItem = dataItem;
      this.showContextMenu = !this.showContextMenu;
      return false;
    }
  }

  onDisableContextMenu() {
    this.showContextMenu = false;
  }

  onToggleDelete(dataItem) {
    dataItem.showDeleteConfirmation = true;
    this.showContextMenu = false;
    this.toBeDeleted[dataItem.id] = true;
  }

  onDoneEditing(e, dataItem) {
    if (e) {
      e.stopPropagation();
    }
    this.store.dispatch(
      new fromRootCauseAnalysisDataActions.UpdateRootCauseAnalysisData({
        ...dataItem,
        isActive: false
      })
    );
  }

  /**
   * Update single data value
   * @param dataValueId
   * @param dataItem
   * @param e
   * @param dataItemValue
   */
  onDataValueUpdate(dataValueId, dataItem, e, dataElements, dataItemValue?) {
    if (e) {
      e.stopPropagation();
    }
    const dataValue = e ? e.target.value.trim() : dataItemValue;
    if (dataValue !== '') {
      const unSavedDataItem = this.unSavedDataItemValues[dataItem.id];
      this.unSavedDataItemValues[dataItem.id] = unSavedDataItem
        ? {
            ...unSavedDataItem,
            dataValues: {
              ...unSavedDataItem.dataValues,
              ...{ [dataValueId]: dataValue }
            }
          }
        : {
            ...dataItem,
            unsaved: true,
            dataValues: {
              ...dataItem.dataValues,
              ...{ [dataValueId]: dataValue }
            }
          };
    }
    const unsavedDataItemObject = this.unSavedDataItemValues
      ? this.unSavedDataItemValues[dataItem.id]
      : null;
    if (unsavedDataItemObject) {
      const dataValues = _.forEach(
        _.values(unsavedDataItemObject['dataValues'] || {})
      );
      const dataIsIncomplete = _.includes(dataValues, '');
      const newDataItem = this.unSavedDataItemValues[dataItem.id];

      this.store.dispatch(
        new fromRootCauseAnalysisDataActions.UpdateRootCauseAnalysisData(
          newDataItem
        )
      );

      if (!dataIsIncomplete) {
        unsavedDataItemObject.isNew
          ? this.saveNewData(unsavedDataItemObject)
          : this.store.dispatch(
              new fromRootCauseAnalysisDataActions.SaveRootCauseAnalysisData(
                newDataItem
              )
            );
      }
    }
  }

  saveNewData(unsavedDataItemObject) {
    this.store.dispatch(
      new fromRootCauseAnalysisDataActions.CreateRootCauseAnalysisData({
        ...unsavedDataItemObject,
        isActive: false
      })
    );
    this.unSavedDataItemValues = {};
  }
  onResetNotification(emptyNotificationMessage) {
    this.store.dispatch(
      new fromRootCauseAnalysisDataActions.ResetRootCauseAnalysisData({
        notification: {
          message: emptyNotificationMessage.message
        }
      })
    );
  }

  /**
   * Update more than one data values especially those coming from selections
   * @param dataValueObject
   * @param dataItem
   */
  onDataValuesUpdate(dataValueObject: any, dataItem, dataElements) {
    _.each(_.keys(dataValueObject), dataValueKey => {
      this.onDataValueUpdate(
        dataValueKey,
        dataItem,
        null,
        dataElements,
        dataValueObject[dataValueKey]
      );
    });
    const newDataItem = this.unSavedDataItemValues[dataItem.id];
    this.store.dispatch(
      new fromRootCauseAnalysisDataActions.UpdateRootCauseAnalysisData(
        newDataItem
      )
    );
  }

  onDataValueEntry(e, dataElement) {
    if (e) {
      e.stopPropagation();
    }
    const newEnteredData = e.target.value.trim();
    if (newEnteredData !== '') {
      const dataValueId = dataElement;

      this.newRootCauseAnalysisData.dataValues[dataElement] = newEnteredData;
      const unSavedDataItem = this.newRootCauseAnalysisData;
      this.newRootCauseAnalysisData = unSavedDataItem
        ? {
            ...unSavedDataItem,
            dataValues: {
              ...unSavedDataItem.dataValues,
              ...{ [dataValueId]: newEnteredData }
            }
          }
        : {
            ...this.newRootCauseAnalysisData,
            dataValues: {
              ...this.newRootCauseAnalysisData.dataValues,
              ...{ [dataValueId]: newEnteredData }
            }
          };
    }
  }
}
