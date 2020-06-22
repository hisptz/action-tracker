import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-column-settings-list',
  templateUrl: './column-settings-list.component.html',
  styleUrls: ['./column-settings-list.component.css'],
})
export class ColumnSettingsListComponent implements OnInit, OnChanges {
  @Input()
  columnSettings;
  @Input()
  fieldsSettings;
  @Output() closeDialogEvent = new EventEmitter<string>();
  @Output() checkCheckAllStatusEvent = new EventEmitter<any>();
  @Output() saveColumnsEvent = new EventEmitter<any>();
  @Output() disableStatusEvent = new EventEmitter<any>();
  @Output() manageCheckboxesEvent = new EventEmitter<any>();
  newColumnSettings = [];
  @Input()
  checkAll;
  @Input()
  unCheckAll;
  @Input()
  checkAllManagementColumnSettings = [];
  @Input()
  disableStatus;
  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {}

  ngOnInit(): void {
    if (this.columnSettings && this.columnSettings.length) {
      for (const setting of this.columnSettings) {
        if (setting) {
          const newSetting = { ...{}, ...setting };
          this.newColumnSettings.push(newSetting);
        }
      }
    }
  }
  getDisableStatusOfCheckbox(id, fieldsSettings) {
    
  let fieldsArr = [];
  if (fieldsSettings && fieldsSettings.length) {
    for (const setting of fieldsSettings) {
      if (
        setting &&
        setting.hasOwnProperty('id') &&
        setting.hasOwnProperty('columnMandatory') &&
        setting.id === id
      ) {
        fieldsArr = [...fieldsArr, setting];
      }
    }
    if (fieldsArr && fieldsArr.length) {
      return fieldsArr[0]?.columnMandatory || false;
    } else {
      return false;
    }
  } else {
    return false;
  }
  }
  saveColumns(form, columnSettings) {
    this.saveColumnsEvent.emit({ form, columnSettings });
  }
  checkCheckAllStatus(columnSettings) {
    this.checkCheckAllStatusEvent.emit(columnSettings);
  }
  closeDialog(action: string) {
    this.closeDialogEvent.emit(action);
  }
  manageCheckboxes(type) {
    this.manageCheckboxesEvent.emit({
      settings: this.newColumnSettings,
      fieldsSettings: this.fieldsSettings,
      type,
    });
  }
}
