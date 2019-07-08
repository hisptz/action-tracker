import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import { ContextMenuComponent } from 'ngx-contextmenu';
import { ContextMenuService } from 'ngx-contextmenu';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { openEntryForm } from 'src/app/core/helpers/open-entry-form.helper';
import { RootCauseAnalysisConfiguration } from 'src/app/core/models/root-cause-analysis-configuration.model';
import { RootCauseAnalysisData } from 'src/app/core/models/root-cause-analysis-data.model';
import {
  AddActionTrackerData,
  CancelActionTrackerData,
  DeleteActionTrackerData,
  SaveActionTrackerData
} from 'src/app/core/store/actions/action-tracker-data.actions';
import { State } from 'src/app/core/store/reducers';
import {
  getCurrentActionTrackerConfig,
  getMergedActionTrackerConfiguration
} from 'src/app/core/store/selectors/action-tracker-configuration.selectors';
import {
  getAllDataNotification,
  getMergedActionTrackerDatasWithRowspanAttribute,
  getOveralLoadingStatus
} from 'src/app/core/store/selectors/action-tracker-data.selectors';
import { getDataSelections } from 'src/app/core/store/selectors/global-selection.selectors';
import {
  getConfigurationLoadedStatus,
  getConfigurationLoadingStatus
} from 'src/app/core/store/selectors/root-cause-analysis-configuration.selectors';
import { getRootCauseAnalysisDataLoadedStatus } from 'src/app/core/store/selectors/root-cause-analysis-data.selectors';

import * as fromRootCauseAnalysisDataActions from '../../../../../core/store/actions/root-cause-analysis-data.actions';
import { listEnterAnimation } from '../../../../animations/list-enter-animation';
import { generateUid } from '../../helpers';
import { DownloadWidgetService } from '../../services/downloadWidgetService.service';

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

  @Input()
  isReport: boolean;

  @ViewChild('rootCauseAnalysisTable', { static: false })
  table: ElementRef;

  @ViewChild(ContextMenuComponent, { static: false })
  public extraActions: ContextMenuComponent;

  configuration$: Observable<RootCauseAnalysisConfiguration>;
  data$: Observable<RootCauseAnalysisData[]>;
  actionTrackerConfiguration$: Observable<any>;
  configurationLoading$: Observable<boolean>;
  configurationLoaded$: Observable<boolean>;
  dataLoading$: Observable<boolean>;
  dataLoaded$: Observable<boolean>;
  notification$: Observable<any>;
  dataSelections$: Observable<any>;
  // savingColor$: Observable<string>;

  newRootCauseAnalysisData: RootCauseAnalysisData;
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
    private downloadWidgetService: DownloadWidgetService,
    private contextMenuService: ContextMenuService
  ) {
    this.configuration$ = store.select(getMergedActionTrackerConfiguration);
    this.actionTrackerConfiguration$ = store.select(
      getCurrentActionTrackerConfig
    );
    this.data$ = store.select(getMergedActionTrackerDatasWithRowspanAttribute);
    this.configurationLoading$ = store.select(getConfigurationLoadingStatus);
    this.configurationLoaded$ = store.select(getConfigurationLoadedStatus);
    this.dataLoaded$ = store.select(getRootCauseAnalysisDataLoadedStatus);
    this.dataLoading$ = store.select(getOveralLoadingStatus);
    this.notification$ = store.select(getAllDataNotification);
    this.dataSelections$ = store.select(getDataSelections);

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

  onActionEdit(dataItem) {
    if (dataItem) {
      !(dataItem.rowspan = 1)
        ? this.openActionTrackerEntryForm(dataItem)
        : openEntryForm(dataItem);
      // dataItem.parentAction
      //   ? this.openActionTrackerEntryForm(dataItem)
      //   : openEntryForm(dataItem);
    }
  }

  onContextMenu(event, dataItem) {
    if (!this.isReport) {
      this.contextMenuService.show.next({
        // Optional - if unspecified, all context menu components will open
        contextMenu: this.extraActions,
        event: event,
        item: dataItem
      });
      event.preventDefault();
      event.stopPropagation();
    }
  }

  onActionDelete(dataItem) {
    const dataItemToDelete = document.getElementById(dataItem.id);
    if (dataItemToDelete) {
      const dataItemColumns = dataItemToDelete.querySelectorAll(
        '.action-tracker-column, .solution-column'
      );
      _.map(dataItemColumns, dataItemColumn => {
        dataItemColumn.hasAttribute('rowspan')
          ? null
          : dataItemColumn.setAttribute('hidden', 'true');
      });
      this.toBeDeleted[dataItem.id] = true;
    }
  }

  onToggleCancelAction($event, dataItem) {
    const dataItemToDelete = document.getElementById(dataItem.id);
    if (dataItemToDelete) {
      const dataItemColumns = dataItemToDelete.querySelectorAll(
        '.action-tracker-column, .solution-column'
      );
      _.map(dataItemColumns, dataItemColumn => {
        !dataItemColumn.hasAttribute('rowspan') &&
        dataItemColumn.classList.contains('forDisplay')
          ? dataItemColumn.removeAttribute('hidden')
          : null;
      });
      this.toBeDeleted[dataItem.id] = false;
    }
  }
  onConfirmActionDelete(dataItem, dataElements) {
    const selectionParams = {};
    if (dataItem && dataElements) {
      selectionParams['orgUnit'] =
        dataItem.dataValues[
          _.get(_.find(dataElements, { name: 'orgUnitId' }), 'id')
        ];
      selectionParams['period'] =
        dataItem.dataValues[
          _.get(_.find(dataElements, { name: 'periodId' }), 'id')
        ];
      selectionParams['dashboard'] =
        dataItem.dataValues[
          _.get(_.find(dataElements, { name: 'interventionId' }), 'id')
        ];
    }
    if (dataItem && dataItem.id) {
      this.store.dispatch(
        new DeleteActionTrackerData(
          { ...dataItem, selectionParams },
          dataItem.id
        )
      );
    } else {
      window.alert('There is no action registered for this solution yet.');
    }
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
  checkIfSolutionHasAnAction(dataItem) {
    if (dataItem) {
      const relatedSolutionDataItems = document.getElementsByClassName(
        dataItem.rootCauseDataId
      );

      if (relatedSolutionDataItems.length == 1) {
        let emptyColumnCount = 0;
        const tableRow = _.head(relatedSolutionDataItems);
        const actionTrackerColumns = tableRow.getElementsByClassName(
          'action-tracker-column'
        );
        _.map(actionTrackerColumns, actionTrackerColumn => {
          if (actionTrackerColumn.innerText === '') {
            emptyColumnCount++;
          }
        });
        return emptyColumnCount > 6 ? false : true;
      } else {
        return true;
      }
    }
  }

  onAddAction(event, dataItem, configuration) {
    if (this.checkIfSolutionHasAnAction(dataItem) == false) {
      this.openActionTrackerEntryForm(dataItem);
    } else {
      const emptyDataValues = this.generateConfigurations(
        configuration.dataElements,
        dataItem.dataValues
      );
      const newDataItem = {
        id: generateUid(),
        dataValues: emptyDataValues,
        isNewRow: true,
        rootCauseDataId: dataItem.rootCauseDataId,
        actionTrackerConfigId: dataItem.actionTrackerConfigId,
        parentAction: dataItem.id
      };
      this.store.dispatch(new AddActionTrackerData(newDataItem));
    }
  }

  openActionTrackerEntryForm(dataItem) {
    const dataItemRowElement = document.getElementById(
      `${dataItem.id || dataItem.rootCauseDataId}`
    );

    const actionTrackerItems = dataItemRowElement.getElementsByClassName(
      'action-tracker-column'
    );

    _.map(actionTrackerItems, (actionTrackerColumn, index) => {
      if (index !== actionTrackerItems.length - 1) {
        actionTrackerColumn.setAttribute('hidden', true);
      } else {
        actionTrackerColumn.colSpan = _.toString(actionTrackerItems.length);
        const buttonElement = _.head(
          actionTrackerColumn.getElementsByClassName('add-action-block')
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

  cancelDataEntryForm(dataItem, allDataItems) {
    if (dataItem.isNewRow) {
      this.closeDataEntryForm(dataItem);
      this.store.dispatch(new CancelActionTrackerData(dataItem));
    } else {
      this.closeDataEntryForm(dataItem);
    }
  }
  closeDataEntryForm(dataItem) {
    const dataItemRowElement = document.getElementById(
      `${dataItem.id || dataItem.rootCauseDataId}`
    );

    const parentDataItemElement = document.getElementById(
      `${dataItem.parentAction || dataItem.id}`
    );
    const actionTrackerItems = dataItemRowElement.getElementsByClassName(
      'action-tracker-column'
    );
    _.map(actionTrackerItems, (actionTrackerColumn, index) => {
      if (index !== actionTrackerItems.length - 1) {
        actionTrackerColumn.removeAttribute('hidden', false);
      } else {
        actionTrackerColumn.colSpan = _.toString(1);
        const buttonElement = _.head(
          actionTrackerColumn.getElementsByClassName('btn-add-action')
        );

        const formElement = _.head(
          actionTrackerColumn.getElementsByClassName(
            'action-tracker-form-wrapper'
          )
        );
        buttonElement.removeAttribute('hidden');
        formElement.setAttribute('hidden', true);
        if (dataItem.parentAction) {
          const parentButtonElement = _.head(
            parentDataItemElement.getElementsByClassName('btn-add-action')
          ).parentNode;
          parentButtonElement.removeAttribute('hidden');
          buttonElement.setAttribute('hidden', true);
        }
      }
    });
  }

  generateConfigurations(configurationDataElements, dataItem) {
    const dataValues: any = {};
    _.forEach(configurationDataElements, element => {
      element.isActionTrackerColumn ? (dataValues[element.id] = '') : null;
    });
    return dataValues;
  }

  // Hook your saving logic here
  onSave(actionTrackerData: any, placeHolderData?: any) {
    actionTrackerData
      ? actionTrackerData.id
        ? this.store.dispatch(
            new SaveActionTrackerData(actionTrackerData, actionTrackerData.id)
          )
        : this.store.dispatch(new SaveActionTrackerData(actionTrackerData))
      : null;
    this.store.dispatch(new CancelActionTrackerData(placeHolderData));
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
