import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

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

  constructor(calendar: NgbCalendar) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
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
  ngOnInit() {}
}
