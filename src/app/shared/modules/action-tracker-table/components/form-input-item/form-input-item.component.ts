import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'form-input-item',
  templateUrl: './form-input-item.component.html',
  styleUrls: ['./form-input-item.component.css']
})
export class FormInputItemComponent implements OnInit {
  @Input() dataItem;
  @Input() dataElement;
  @Output() updateValue: EventEmitter<any> = new EventEmitter<any>();
  constructor() {}
  onDataValueUpdate(event, dataElementId, dataItem, dataElement) {
    if (event) {
      event.stopPropagation;
      event.target.value.trim()
        ? (dataItem = event.target.value.trim())
        : dataItem;

      this.updateValue.emit({ [this.dataElement.id]: dataItem });
    }
  }

  ngOnInit() {}
}
