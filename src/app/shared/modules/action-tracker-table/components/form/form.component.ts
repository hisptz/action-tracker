import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
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

  @Output() save: EventEmitter<any> = new EventEmitter<any>();

  actionTrackerForm: FormGroup;
  formArray: {};
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.formArray = {};
    const dataElements = this.configurations
      ? this.configurations.dataElements
      : [];
    _.map(_.filter(dataElements, 'isActionTrackerColumn'), dataElement => {
      this.formArray[dataElement.formControlName] = '';
    });
    this.actionTrackerForm = this.formBuilder.group(this.formArray);

    this.actionTrackerForm.valueChanges.subscribe(console.log);
  }

  onDataEntryCancel(event, dataItem) {
    this.cancel.emit(dataItem);
  }
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
    selectionParams['rootCauseDataId'] = dataItem.id;

    this.save.emit({ ...actionTrackerData, selectionParams });
    actionTrackerData['rootCauseDataId'] = dataItem.id;
  }
}
