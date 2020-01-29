import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import { ContextMenuComponent } from 'ngx-contextmenu';
import { ContextMenuService } from 'ngx-contextmenu';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { RootCauseAnalysisConfiguration } from 'src/app/core/models/root-cause-analysis-configuration.model';
import { RootCauseAnalysisData } from 'src/app/core/models/root-cause-analysis-data.model';

import { State } from 'src/app/core/store/reducers';
import {
  getCurrentActionTrackerConfig,
  getMergedActionTrackerConfiguration
} from 'src/app/core/store/selectors/action-tracker-configuration.selectors';
import {
  LegendSetState,
  getActionStatusLegendSet,
  getActionStatusLegendSetItems
} from '../../../selection-filters/modules/legend-set-configuration/store';
import { getDataSelections } from 'src/app/core/store/selectors/global-selection.selectors';
import {
  getConfigurationLoadedStatus,
  getConfigurationLoadingStatus
} from 'src/app/core/store/selectors/root-cause-analysis-configuration.selectors';
import {
  getRootCauseAnalysisDataLoadedStatus,
  getAllRootCauseAnalysisData
} from 'src/app/core/store/selectors/root-cause-analysis-data.selectors';

import {
  getAllDataNotification,
  getOveralLoadingStatus,
  getMergedActionTrackerDatasWithRowspanAttribute
} from 'src/app/core/store/selectors/action-tracker-data.selectors';

import {
  AddActionTrackerData,
  CancelActionTrackerData,
  DeleteActionTrackerData,
  SaveActionTrackerData
} from 'src/app/core/store/actions/action-tracker-data.actions';

import * as fromRootCauseAnalysisDataActions from '../../../../../core/store/actions/root-cause-analysis-data.actions';
import { listEnterAnimation } from '../../../../animations/list-enter-animation';
import { generateUid } from '../../helpers';
import { DownloadWidgetService } from '../../services/downloadWidgetService.service';
import * as jsPDF from 'jspdf';
import domtoimage from 'dom-to-image';

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

  selectedDataItem: any = {};

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
  legendSetStatus$: Observable<any>;
  legendSetItems$: Observable<any>;

  display = 'none';

  constructor(
    private store: Store<State>,
    private legendSetStore: Store<LegendSetState>,
    private downloadWidgetService: DownloadWidgetService,
    private contextMenuService: ContextMenuService
  ) {
    this.data$ = store.select(getMergedActionTrackerDatasWithRowspanAttribute);

    this.configuration$ = store.select(getMergedActionTrackerConfiguration);
    this.actionTrackerConfiguration$ = store.select(
      getCurrentActionTrackerConfig
    );
    this.legendSetStatus$ = this.legendSetStore.select(
      getActionStatusLegendSet
    );

    this.legendSetItems$ = this.legendSetStore.select(
      getActionStatusLegendSetItems
    );

    this.configurationLoading$ = store.select(getConfigurationLoadingStatus);
    this.configurationLoaded$ = store.select(getConfigurationLoadedStatus);
    this.dataLoaded$ = store.select(getRootCauseAnalysisDataLoadedStatus);
    this.dataLoading$ = store.select(getOveralLoadingStatus);
    this.notification$ = store.select(getAllDataNotification);
    this.dataSelections$ = store.select(getDataSelections);
    this.unSavedDataItemValues = {};

    // store
    //   .select(getMergedActionTrackerDatasWithRowspanAttribute)
    //   .subscribe(object => {
    //     console.log(object);
    //   });
  }

  ngOnInit() {}

  onAddAction(dataItem, configuration) {
    if (!dataItem.id) {
      this.openModal(dataItem);
    } else {
      const emptyDataValues = this.generateConfigurations(
        configuration,
        dataItem
      );
      const newDataItem = {
        trackedEntityInstance: generateUid(),
        dataValues: emptyDataValues,
        isNewRow: true,
        rootCauseDataId: dataItem.rootCauseDataId,
        parentAction: dataItem.id
      };
      this.openModal(newDataItem);
    }
  }

  openModal(dataItem) {
    this.selectedDataItem = dataItem;
    this.display = 'block';
  }

  onActionEdit(dataItem) {
    this.display = 'block';
    this.selectedDataItem = dataItem;
  }

  onCloseHandled() {
    this.display = 'none';
  }

  onSave(actionTrackerData: any, placeHolderData?: any) {
    actionTrackerData
      ? actionTrackerData.trackedEntityInstance
        ? this.store.dispatch(
            new SaveActionTrackerData(
              actionTrackerData,
              actionTrackerData.trackedEntityInstance
            )
          )
        : this.store.dispatch(new SaveActionTrackerData(actionTrackerData))
      : null;
    this.onCloseHandled();
    // this.store.dispatch(new CancelActionTrackerData(placeHolderData));
  }

  cancelDataEntryForm(dataItem, allDataItems) {
    if (dataItem.isNewRow) {
      this.store.dispatch(new CancelActionTrackerData(dataItem));
      this.onCloseHandled();
    } else {
      this.onCloseHandled();
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
    if (dataItem && dataItem.trackedEntityInstance) {
      this.store.dispatch(
        new DeleteActionTrackerData(dataItem.trackedEntityInstance)
      );
    } else {
      window.alert('There is no action registered for this solution yet.');
    }
  }

  generateFileName() {
    const dateTime = new Date();
    const filename =
      'Action Tracker gen. on ' +
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
    return filename;
  }

  printPDF(filename, htmlElement) {
    domtoimage.toJpeg(htmlElement, { quality: 1 }).then(function(dataUrl) {
      let pdf = new jsPDF('p', 'pt', 'a4');
      pdf.addImage(dataUrl, 'JPEG', 40, 40, 520, 150);
      pdf.save(filename + '.pdf');
    });
  }

  downloadTable(downloadFormat) {
    if (this.table) {
      const el = this.table.nativeElement;
      const filename = this.generateFileName();

      if (el) {
        if (downloadFormat === 'PDF') {
          this.printPDF(filename, el);
        } else if (downloadFormat === 'XLSX') {
          const item = el.cloneNode(true);
          _.map(item.querySelectorAll('.hide-on-export'), elementNotExport =>
            elementNotExport.remove()
          );
          this.downloadWidgetService.exportXLS(filename, item.outerHTML);
        } else if (downloadFormat === 'CSV') {
          this.downloadWidgetService.exportCSV(filename, el);
        }
      }
    }
  }

  generateConfigurations(configurationDataElements, dataItem) {
    _.map(dataItem.dataValues, (dataValue, index) => {
      return _.find(configurationDataElements, {
        isActionTrackerColumn: true,
        id: index
      })
        ? _.set(dataItem.dataValues, `${index}`, '')
        : null;
    });
    return dataItem.dataValues;
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
}
