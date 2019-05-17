import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import * as _ from 'lodash';
@Component({
  selector: 'app-data-entry',
  templateUrl: './data-entry.component.html',
  styleUrls: ['./data-entry.component.css']
})
export class DataEntryComponent implements OnInit {
  actionTrackerForm: FormGroup;
  formArray: {};
  formConfig = [
    {
      id: 'fnwIiq3TNki',
      name: 'Action Description',
      valueType: 'TEXTAREA',
      optionSetValue: false,
      formControlName: 'actionDescription'
    },
    {
      id: 'UlTqe4EWEgi',
      name: 'Action Period',
      valueType: 'PERIOD',
      optionSetValue: false,
      formControlName: 'actionPeriod'
    },
    {
      id: 'MjHAVwKni19',
      name: 'Responsible Person',
      valueType: 'TEXT',
      optionSetValue: false,
      formControlName: 'responsiblePerson'
    },
    {
      id: 'P4xS2frCGfv',
      name: 'Designation Title',
      valueType: 'TEXT',
      optionSetValue: false,
      formControlName: 'designationTitle'
    },
    {
      id: 'MF6npXkFfgu',
      name: 'Action Status',
      valueType: 'PERIOD',
      optionSetValue: false,
      formControlName: 'actionStatus'
    },
    {
      id: 'wksQFZVn3bn',
      name: 'Review Date',
      valueType: 'TEXT',
      optionSetValue: false,
      formControlName: 'reviewDate'
    },
    {
      id: 'EPl9QPSKbkH',
      name: 'Remarks',
      valueType: 'TEXTAREA',
      optionSetValue: false,
      formControlName: 'remarks'
    }
  ];
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.formArray = {};
    _.map(this.formConfig, actionTrackerDE => {
      this.formArray[actionTrackerDE.formControlName] = '';
    });
    this.actionTrackerForm = this.formBuilder.group(this.formArray);

    this.actionTrackerForm.valueChanges.subscribe(console.log);
  }
}
