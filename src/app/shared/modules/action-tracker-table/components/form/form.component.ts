import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';
@Component({
  selector: 'action-tracker-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  @Input() dataItem;
  @Input() configurations;
  @Output() cancel: EventEmitter<any> = new EventEmitter<any>();

  actionDescription: string = '';
  actionPeriod: string = '';
  responsiblePerson: string = '';
  designationTitle: string = '';
  actionStatus: string = '';
  reviewDate: string = '';
  remarks: string = '';

  constructor() {}

  ngOnInit() {}

  onDataEntryCancel(event, dataItem) {
    this.cancel.emit(dataItem);
  }
  onDataEntrySave(event, dataItem, dataElement) {
    if (event) {
      event.stopPropagation;
    }
    const actionTrackerData = {};
    const dataValueStructure = {};

    if (dataItem && dataElement) {
      actionTrackerData['orgUnit'] =
        dataItem.dataValues[
          _.get(_.find(dataElement, { name: 'orgUnitId' }), 'id')
        ];
      actionTrackerData['period'] =
        dataItem.dataValues[
          _.get(_.find(dataElement, { name: 'periodId' }), 'id')
        ];
      actionTrackerData['dashboard'] =
        dataItem.dataValues[
          _.get(_.find(dataElement, { name: 'interventionId' }), 'id')
        ];
    }
    _.map(_.filter(dataElement, 'isActionTrackerColumn'), dataValue => {
      dataValueStructure[dataValue.id] = dataValue.formControlName
        ? dataValue.formControlName
        : '';
    });
    actionTrackerData['dataValues'] = dataValueStructure;
    actionTrackerData['rootCauseDataId'] = dataItem.id;
  }
}
