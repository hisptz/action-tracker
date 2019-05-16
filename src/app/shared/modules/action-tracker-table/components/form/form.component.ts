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

  @Output() save: EventEmitter<any> = new EventEmitter<any>();

  actionDescription = '';
  actionPeriod = '';
  responsiblePerson = '';
  designationTitle = '';
  actionStatus = '';
  reviewDate = '';
  remarks = '';

  constructor() {}

  ngOnInit() {}

  onDataEntrySave(event, dataItem, dataElement) {
    if (event) {
      event.stopPropagation();
    }

    const actionTrackerData = {};
    const selectionParams = {};
    const dataValueStructure = {};

    if (dataItem && dataElement) {
      selectionParams['orgUnit'] =
        dataItem.dataValues[
          _.get(_.find(dataElement, { name: 'orgUnitId' }), 'id')
        ];
      selectionParams['period'] =
        dataItem.dataValues[
          _.get(_.find(dataElement, { name: 'periodId' }), 'id')
        ];
      selectionParams['dashboard'] =
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
    selectionParams['rootCauseDataId'] = dataItem.rootCauseDataId;

    this.save.emit({ ...actionTrackerData, selectionParams });
  }
}
