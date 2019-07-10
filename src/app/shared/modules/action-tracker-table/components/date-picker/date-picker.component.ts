import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { split, last, head, toNumber } from 'lodash';
@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',

  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent implements OnInit {
  @Input() rangeSelector;
  @Input() periodUI;
  @Input() defaultValue;

  @Output() singleSelectionDate = new EventEmitter<any>();
  @Output() rangeSelectionDate = new EventEmitter<any>();
  showRangePicker: boolean;
  hoveredDate: NgbDate;

  fromDate: NgbDate;
  toDate: NgbDate;
  currentReviewDate: NgbDate;

  constructor(private calendar: NgbCalendar) {}

  ngOnInit() {
    if (this.defaultValue && this.defaultValue.length > 10) {
      const endDate = split(last(split(this.defaultValue, '-')), '/');
      const startDate = split(head(split(this.defaultValue, '-')), '/');

      this.fromDate = new NgbDate(
        toNumber(startDate[0]),
        toNumber(startDate[1]),
        toNumber(startDate[2])
      );

      this.toDate = new NgbDate(
        toNumber(endDate[0]),
        toNumber(endDate[1]),
        toNumber(endDate[2])
      );
    } else if (this.defaultValue && this.defaultValue.length <= 10) {
      const slicedReviewDate = split(this.defaultValue, '-');
      this.currentReviewDate = new NgbDate(
        toNumber(slicedReviewDate[0]),
        toNumber(slicedReviewDate[1]),
        toNumber(slicedReviewDate[2])
      );
    } else {
      this.fromDate = this.calendar.getToday();
      this.toDate = this.calendar.getNext(this.calendar.getToday(), 'd', 10);
    }
  }

  onReviewDateSelection(date: NgbDate) {
    this.singleSelectionDate.emit(date);
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
    if (this.toDate && this.fromDate) {
      this.rangeSelectionDate.emit({
        fromDate: this.fromDate,
        toDate: this.toDate
      });
    }
  }

  isHovered(date: NgbDate) {
    return (
      this.fromDate &&
      !this.toDate &&
      this.hoveredDate &&
      date.after(this.fromDate) &&
      date.before(this.hoveredDate)
    );
  }

  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return (
      date.equals(this.fromDate) ||
      date.equals(this.toDate) ||
      this.isInside(date) ||
      this.isHovered(date)
    );
  }
}
