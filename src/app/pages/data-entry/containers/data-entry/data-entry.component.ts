import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { DownloadService } from '../../../../core/services/downloadService.service';
import { ActionTableComponent } from '../action-table/action-table.component';

import * as jsPDF from 'jspdf';
import domtoimage from 'dom-to-image';

import * as _ from 'lodash';

@Component({
  selector: 'app-data-entry',
  templateUrl: './data-entry.component.html',
  styleUrls: ['./data-entry.component.css'],
})
export class DataEntryComponent implements OnInit {
  isLinear: true;
  @ViewChild(ActionTableComponent, { static: false })
  tableComponent: ActionTableComponent;
  isActionTracking: boolean;
  constructor(private downloadService: DownloadService) {}
  ngOnInit() {}

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

  onDownloadActions(downloadFormat) {
    if (this.tableComponent) {
      const el = this.tableComponent.getTableElement();
      const filename = this.generateFileName();

      if (el) {
        if (downloadFormat === 'PDF') {
          this.printPDF(filename, el);
        } else if (downloadFormat === 'XLSX') {
          const item = el.cloneNode(true);
          _.map(item.querySelectorAll('.hide-on-export'), (elementNotExport) =>
            elementNotExport.remove()
          );
          this.downloadService.exportXLS(filename, item.outerHTML);
        } else if (downloadFormat === 'CSV') {
          this.downloadService.exportCSV(filename, el);
        }
      }
    }
  }

  printPDF(filename, htmlElement) {
    window.print();
    // domtoimage.toJpeg(htmlElement, { quality: 1 }).then(function(dataUrl) {
    //   let pdf = new jsPDF('p', 'pt', 'a4');
    //   pdf.addImage(dataUrl, 'JPEG', 40, 40, 520, 150);
    //   pdf.save(filename + '.pdf');
    // });
  }

  onToggleActionTracking(e, module) {
    e.stopPropagation();

    this.isActionTracking = module === 'tracking' ? true : false;
  }
}
