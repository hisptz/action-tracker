import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';

import {DownloadService} from '../../../../core/services/downloadService.service';
import {ActionTableComponent} from '../action-table/action-table.component';

import * as jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import domtoimage from 'dom-to-image';

import * as _ from 'lodash';
import {
  getActionStatusLegendSet,
  LegendSetState
} from '../../../../shared/modules/selection-filters/modules/legend-set-configuration/store';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-data-entry',
  templateUrl: './data-entry.component.html',
  styleUrls: ['./data-entry.component.css'],
})
export class DataEntryComponent implements OnInit {
  isLinear: true;
  @ViewChild(ActionTableComponent, {static: false})
  tableComponent: ActionTableComponent;
  isActionTracking: boolean;

  legendSetStatus$: Observable<any>;


  constructor(private downloadService: DownloadService, private legendSetStore: Store<LegendSetState>) {

  }

  ngOnInit() {
    this.legendSetStatus$ = this.legendSetStore.select(
      getActionStatusLegendSet
    );
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

  onDownloadActions({downloadType: downloadFormat, data, allowIds}) {
    const filename = this.generateFileName();


    switch (downloadFormat) {
      case 'XLSX':
        this.generateExcelFile(this.formatData(data, {allowIds}), filename, {format: 'xls'});
        break;
      case 'PDF':
        const el = this.tableComponent.getTableElement();
        if (el) {
          this.printPDF(filename, el);
        }
        break;
      case 'CSV':
        this.generateExcelFile(this.formatData(data, {allowIds}), filename, {format: 'csv'});
        break;
      default:
        return;
    }
  }

  printPDF(filename, htmlElement) {
    window.print();
    domtoimage.toJpeg(htmlElement, {quality: 1}).then(function (dataUrl) {
      const pdf = new jsPDF('p', 'pt', 'a4');
      pdf.addImage(dataUrl, 'JPEG', 40, 40, 520, 150);
      pdf.save(filename + '.pdf');
    });
  }

  getStatusFromId(statusId: string, legendStatus: object) {
    const {name} = _.find(legendStatus['legends'], ['id', statusId]) || {};
    return name;
  }

  generateExcelFile(data: Array<object>, filename: string, {format}) {
    const excelSheet = XLSX.utils.json_to_sheet(data);
    const excelWorkbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(excelWorkbook, excelSheet, 'Action Tracker');
    XLSX.writeFile(excelWorkbook, filename + `.${format}`, {bookType: format});
  }

  formatData(data, {allowIds}) {
    const columns = [
      {
        name: 'Organisation Unit',
        path: ['dataValues', 'pQtxdfQ6Jum'],
        allowed: false,
        type: 'name'
      },
      {
        name: 'Organisation Units ID',
        path: ['dataValues', 'qOvrGMTGBee'],
        allowed: false,
        type: 'id'
      },
      {
        name: 'Period',
        path: ['dataValues', 'skBBrbmML4S'], // Probably the id for the periodID instead of period
        allowed: false,
        type: 'name'
      },
      {
        name: 'Period ID',
        path: ['dataValues', 'yzYKWac02lm'], // Probably the id for the period instead of periodID
        allowed: false,
        type: 'id'
      },
      {
        name: 'Intervention',
        path: ['dataValues', 'YPfJQu6sCSZ'],
        allowed: false,
        type: 'name'
      },
      {
        name: 'Intervention ID',
        path: ['dataValues', 'GXqfW1B2McT'],
        allowed: false,
        type: 'id'
      },
      {
        name: 'Bottleneck',
        path: ['dataValues', 'fZCEB7Euppr'],
        allowed: false,
        type: 'name'
      },
      {
        name: 'Bottleneck ID',
        path: ['dataValues', 'xf7L8ioFiC5'],
        allowed: false,
        type: 'id'
      },
      {
        name: 'Indicator',
        path: ['dataValues', 'gE2BDDC0e0V'],
        allowed: false,
        type: 'name'
      },
      {
        name: 'Indicator ID',
        path: ['dataValues', 'oMCl2j0dIlN'],
        allowed: false,
        type: 'id'
      },
      {
        name: 'Possible Root Cause',
        path: ['dataValues', 'HwElwZJ9Oyc'],
        allowed: false,
        type: 'name'
      },
      {
        name: 'Possible Solution',
        path: ['dataValues', 'PS29TQkElZL'],
        allowed: false,
        type: 'name'
      },
      {
        name: 'BNA Reference',
        path: ['dataValues', 'blOw6mjuv6j'],
        allowed: false,
        type: 'id'
      },
      {
        name: 'Action Description',
        path: ['dataValues', 'dhr6wl8F7So'],
        allowed: false,
        type: 'id'
      },
      {
        name: 'Start Date',
        path: ['dataValues', 'qTXUUntafIX'],
        allowed: false,
        type: 'date'
      },
      {
        name: 'End Date',
        path: ['dataValues', 'ge6NMvlcYx5'],
        allowed: false,
        type: 'date'
      },
      {
        name: 'Responsible Person',
        path: ['dataValues', 'AuW5NppdH5e'],
        allowed: false,
        type: 'name'
      },
      {
        name: 'Designation Title',
        path: ['dataValues', 'Ua9aBlFUHXb'],
        allowed: false,
        type: 'name'
      },
      {
        name: 'Budget',
        path: ['dataValues', 'P7qIYtQIeoK'],
        allowed: false,
        type: 'name'
      },
      {
        name: 'BNA Target',
        path: ['dataValues', 'knMPFmtAM29'],
        allowed: false,
        type: 'name'
      },
      {
        name: 'Latest Status',
        path: ['latestStatus'],
        allowed: false,
        type: 'name'
      },
    ];
    const reportData = [];
    this.legendSetStatus$.pipe(take(1)).subscribe((legendStatus) => {
      for (const dataEntry of data) {
        const row = {};
        for (const column of columns) {
          if (column.name === 'Latest Status') {
            _.set(row, column.name, this.getStatusFromId(_.get(dataEntry, column.path), legendStatus));
            continue;
          }
          if (column.type === 'id' && !allowIds) {
            continue;
          }
          _.set(row, column.name, _.get(dataEntry, column.path));
        }
        if (this.isActionTracking) {
          const {actionTrackingColumns} = dataEntry || {};
          if (!_.isEmpty(actionTrackingColumns)) {
            for (const trackingData of actionTrackingColumns) {
              const {name, actionComments, actionStatus, eventDate} = trackingData || {};
              if (eventDate) { // Check if the quarter has data
                _.set(row, name, `Status \n ${this.getStatusFromId(actionStatus, legendStatus)} \n  Comments \n ${actionComments}\n Review Date \n ${eventDate}`);
              }
            }

          }
        }
        reportData.push(row);
      }
    });
    return reportData;
  }

  onToggleActionTracking(e, module) {
    e.stopPropagation();
    this.isActionTracking = module === 'tracking';
  }
}
