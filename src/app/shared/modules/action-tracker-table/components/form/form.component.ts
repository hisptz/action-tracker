import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'action-tracker-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  @Input() dataItems;
  @Input() configurations;

  constructor() {}

  onDataEntrySave(event, dataItem, dataElement) {}

  ngOnInit() {}
}
