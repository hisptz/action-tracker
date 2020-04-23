import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';
import { generateEvent } from 'src/app/core/helpers/generate-event-payload.helper';
@Component({
  selector: 'form-input-item',
  templateUrl: './form-input-item.component.html',
  styleUrls: ['./form-input-item.component.css']
})
export class FormInputItemComponent implements OnInit {
  @Input() dataItem;
  @Input() dataElement;
  @Input() actionTrackingItem;
  @Input() configuration;
  @Input() legendSetItems;
  @Output() updateValue: EventEmitter<any> = new EventEmitter<any>();
  @Output() cancel: EventEmitter<any> = new EventEmitter<any>();

  @Output() save: EventEmitter<any> = new EventEmitter<any>();
  actionStatusValue;
  constructor() {}
  onDataValueChange(
    event,
    dataItem,
    dataElement,
    actionTrackingItem,
    reviewDate?
  ) {
    if (event || reviewDate) {
      let newDataValue;
      let eventDate;
      let isNewEvent;
      event
        ? (newDataValue = event.target.value.trim())
        : reviewDate || dataItem;

      if (
        dataElement.isActionStatus &&
        this.actionStatusValue != newDataValue
      ) {
        isNewEvent = true;
      }
      const newDataValuesArray = _.compact(
        _.map(this.configuration, dataValueConfig => {
          if (dataValueConfig.formControlName != 'eventDate') {
            return {
              dataElement: dataValueConfig.id,
              value: actionTrackingItem[dataValueConfig.formControlName]
            };
          }
          eventDate = reviewDate
            ? reviewDate
            : actionTrackingItem[dataValueConfig.formControlName];
        })
      );

      const eventId = actionTrackingItem.id;
      const eventPayload = generateEvent(dataItem, eventId, eventDate);
      this.updateValue.emit({ eventPayload: eventPayload });
    }
  }

  setReviewDate(reviewDateObject, actionTrackingItem, dataElement, dataItem) {
    const reviewDate = _.join(
      [
        reviewDateObject.year,
        _.lt(reviewDateObject.month, 10)
          ? '0' + _.toString(reviewDateObject.month)
          : reviewDateObject.month,
        reviewDateObject.day
      ],
      '-'
    );

    this.onDataValueChange(
      null,
      dataItem,
      dataElement,
      actionTrackingItem,
      reviewDate
    );
  }

  ngOnInit() {
    if (this.dataElement.isActionStatus) {
      this.actionStatusValue = this.actionTrackingItem[
        this.dataElement.formControlName
      ];
    }
  }
}
