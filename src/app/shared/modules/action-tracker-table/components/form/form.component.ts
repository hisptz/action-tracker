import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { generateTEI } from '../../../../../core/helpers/generate-tracked-entity-instance.helper';
import * as _ from 'lodash';
@Component({
  selector: 'action-tracker-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  @Input() dataItem;
  @Input() legendSetItems;
  @Input() configurations;

  @Output() cancel: EventEmitter<any> = new EventEmitter<any>();

  @Output() save: EventEmitter<any> = new EventEmitter<any>();

  rangeSelectorParams = {
    displayMonths: 2,
    navigation: 'select',
    showWeekNumbers: false,
    outsideDays: 'visible'
  };

  actionTrackerForm: FormGroup;
  formArray: {};
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.formArray = {};
    const dataElements = this.configurations
      ? this.configurations.dataElements
      : [];

    _.map(_.filter(dataElements, 'isActionTrackerColumn'), dataElement => {
      this.formArray[dataElement.formControlName] = this.dataItem
        ? this.dataItem.dataValues
          ? this.dataItem.dataValues[
              dataElement.id || dataElement.formControlName
            ]
          : ''
        : '';
    });
    this.actionTrackerForm = this.formBuilder.group(this.formArray);
  }

  setReviewDate(reviewDateObject, actionTrackerForm, dataElement) {
    if (actionTrackerForm) {
      actionTrackerForm.controls
        ? actionTrackerForm.controls[dataElement].setValue(
            _.join(
              [
                reviewDateObject.year,
                _.lt(reviewDateObject.month, 10)
                  ? '0' + _.toString(reviewDateObject.month)
                  : reviewDateObject.month,
                reviewDateObject.day
              ],
              '-'
            )
          )
        : null;
    }
  }

  setActionPeriod(reviewDateObject, actionTrackerForm, dataElement) {
    if (actionTrackerForm) {
      const startDate = reviewDateObject.fromDate;
      const endDate = reviewDateObject.toDate;
      actionTrackerForm.value
        ? actionTrackerForm.controls[dataElement].setValue(
            _.join(
              [
                startDate.year,
                _.lt(startDate.month, 10)
                  ? '0' + _.toString(startDate.month)
                  : startDate.month,
                startDate.day
              ],
              '/'
            ) +
              '-' +
              _.join(
                [
                  endDate.year,
                  _.lt(endDate.month, 10)
                    ? '0' + _.toString(endDate.month)
                    : endDate.month,
                  endDate.day
                ],
                '/'
              )
          )
        : null;
    }
  }
  onDataEntryCancel(event, dataItem) {
    this.cancel.emit(dataItem);
  }
  onDataEntrySave(dataItem, dataElement) {
    const selectionParams = {};
    const attributes = [];
    const dataValues = [];
    selectionParams['orgUnit'] = _.get(
      dataItem,
      `dataValues[${_.get(_.find(dataElement, { name: 'orgUnitId' }), 'id')}]`
    );
    selectionParams['rootCauseDataId'] = dataItem.rootCauseDataId;

    _.map(_.filter(dataElement, 'isActionTrackerColumn'), dataValue => {
      if (dataItem.id) {
        dataValue.isTrackedEntityAttribute
          ? this.generateAttributePayload(
              attributes,
              dataValue,
              dataItem.rootCauseDataId
            )
          : this.updateEnrollmentPayload(dataItem, dataValue);
      } else {
        this.createEnrollmentPayload(
          attributes,
          dataValues,
          dataValue,
          selectionParams
        );
      }
    });

    this.save.emit(
      generateTEI({
        ...dataItem,
        dataValues,
        attributes,
        selectionParams
      })
    );
  }

  generateAttributePayload(attributes, dataValue, rootCauseId) {
    attributes.push({
      attribute: dataValue.id,
      value:
        this.actionTrackerForm.value[dataValue.formControlName] || rootCauseId
    });
  }

  createEnrollmentPayload(
    attributes,
    trackerDataValues,
    dataValue,
    selectionParams?
  ) {
    dataValue.isTrackedEntityAttribute
      ? this.generateAttributePayload(
          attributes,
          dataValue,
          selectionParams.rootCauseDataId
        )
      : dataValue.formControlName != 'eventDate'
      ? trackerDataValues.push({
          dataElement: dataValue.id,
          value: this.actionTrackerForm.value[dataValue.formControlName]
        })
      : _.set(
          selectionParams,
          'eventDate',
          this.actionTrackerForm.value[dataValue.formControlName]
        );
  }
  updateEnrollmentPayload(dataItem, dataValue) {
    _.map(dataItem.enrollments, enrollment => {
      _.map(enrollment.events, event => {
        const dataElementIdIndex = _.findIndex(
          event.dataValues,
          eventDataValue => {
            return eventDataValue.dataElement == dataValue.id;
          }
        );
        dataElementIdIndex >= 0
          ? _.set(
              event,
              `dataValues[${dataElementIdIndex}].value`,
              this.actionTrackerForm.value[dataValue.formControlName]
            )
          : _.set(
              event,
              `eventDate`,
              this.actionTrackerForm.value[dataValue.formControlName]
            );
      });
    });
  }
}
