import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, FormArray } from "@angular/forms";
import { generateTEI } from "../../../../../core/helpers/generate-tracked-entity-instance.helper";
import * as _ from "lodash";
@Component({
  selector: "action-tracker-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.css"]
})
export class FormComponent implements OnInit {
  @Input() dataItem;
  @Input() legendSetItems;
  @Input() configurations;

  @Output() cancel: EventEmitter<any> = new EventEmitter<any>();

  @Output() save: EventEmitter<any> = new EventEmitter<any>();

  rangeSelectorParams = {
    displayMonths: 2,
    navigation: "select",
    showWeekNumbers: false,
    outsideDays: "visible"
  };

  actionTrackerForm: FormGroup;
  formArray: {};
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.formArray = {};
    const dataElements = this.configurations
      ? this.configurations.dataElements
      : [];

    _.map(_.filter(dataElements, "isActionTrackerColumn"), dataElement => {
      this.formArray[dataElement.formControlName] = this.dataItem
        ? this.dataItem.dataValues
          ? this.dataItem.dataValues[dataElement.id]
          : ""
        : "";
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
                  ? "0" + _.toString(reviewDateObject.month)
                  : reviewDateObject.month,
                reviewDateObject.day
              ],
              "-"
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
                  ? "0" + _.toString(startDate.month)
                  : startDate.month,
                startDate.day
              ],
              "/"
            ) +
              "-" +
              _.join(
                [
                  endDate.year,
                  _.lt(endDate.month, 10)
                    ? "0" + _.toString(endDate.month)
                    : endDate.month,
                  endDate.day
                ],
                "/"
              )
          )
        : null;
    }
  }
  onDataEntryCancel(event, dataItem) {
    this.cancel.emit(dataItem);
  }
  onDataEntrySave(dataItem, dataElement) {
    const actionTrackerData = {};
    const selectionParams = {};
    const attributes = [];
    const dataValues = [];

    if (dataItem && dataElement) {
      selectionParams["orgUnit"] =
        dataItem.dataValues[
          _.get(_.find(dataElement, { name: "orgUnitId" }), "id")
        ];
      selectionParams["period"] =
        dataItem.dataValues[
          _.get(_.find(dataElement, { name: "periodId" }), "id")
        ];
      selectionParams["dashboard"] =
        dataItem.dataValues[
          _.get(_.find(dataElement, { name: "interventionId" }), "id")
        ];
    }
    _.map(_.filter(dataElement, "isActionTrackerColumn"), dataValue => {
      if (dataValue.isTrackedEntityAttribute) {
        attributes.push({
          attribute: dataValue.id,
          value: this.actionTrackerForm.value[dataValue.formControlName]
        });
      } else {
        dataValue.formControlName != "eventDate"
          ? dataValues.push({
              dataElement: dataValue.id,
              value: this.actionTrackerForm.value[dataValue.formControlName]
            })
          : _.set(
              selectionParams,
              "eventDate",
              this.actionTrackerForm.value[dataValue.formControlName]
            );
      }
    });
    dataItem.id && !dataItem.isNewRow
      ? (actionTrackerData["id"] = dataItem.id)
      : null;
    // actionTrackerData["dataValues"] = attributes;
    selectionParams["rootCauseDataId"] = dataItem.rootCauseDataId;
    generateTEI({
      ...actionTrackerData,
      dataValues,
      attributes,
      selectionParams
    });
    // this.save.emit({ ...actionTrackerData, selectionParams });
  }
}
