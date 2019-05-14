import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-text-area-input',
  templateUrl: './text-area-input.component.html',
  styleUrls: ['./text-area-input.component.css']
})
export class TextAreaInputComponent implements OnInit {
  @Input()
  dataElement: any;
  @Input()
  dataItemValue: string;

  @Output()
  updateValue: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  onEditRootCauseAnalysisData(e) {
    e.stopPropagation();
    this.updateValue.emit({ [this.dataElement.id]: e.target.value.trim() });
  }
}
