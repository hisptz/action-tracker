import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';
import { OrderByPipe } from 'ngx-pipes';
@Component({
  selector: 'app-select-box-input',
  templateUrl: './select-box-input.component.html',
  styleUrls: ['./select-box-input.component.css']
})
export class SelectBoxInputComponent implements OnInit {
  @Input()
  dataElement: any;
  @Input()
  dataItemValue: string;

  @Input()
  dataValues: any;

  @Input()
  groups: any[];

  @Input()
  backgroundColor: string;

  @Output()
  updateDataValues: EventEmitter<any> = new EventEmitter<any>();
  constructor() {}

  get selectionsOptions() {
    if (!this.dataElement && !this.groups) {
      return [];
    }
    const currentGroup = _.find(this.groups, [
      'id',
      this.dataValues[this.dataElement.parentId]
    ]);

    const selectedOptions =  !this.dataElement.parentId
      ? this.groups
      : currentGroup && currentGroup.members
        ? currentGroup.members
        : [];
    return [{id: '', name: '-- Select/None --' , isDisabled: true}, ...selectedOptions];
  }

  ngOnInit() {}

  onDataValueChange(e) {
    e.stopPropagation();
    const dataItemObject = _.find(this.selectionsOptions, [
      'name',
      this.dataItemValue
    ]);
    this.updateDataValues.emit({
      [this.dataElement.id]: this.dataItemValue,
      [this.dataElement.associatedId]: dataItemObject ? dataItemObject.id : null
    });
  }
}
