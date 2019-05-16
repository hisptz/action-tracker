import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-auto-filled-input',
  templateUrl: './auto-filled-input.component.html',
  styleUrls: ['./auto-filled-input.component.css']
})
export class AutoFilledInputComponent implements OnInit {
  @Input()
  dataElement: any;
  @Input()
  orgUnit: string;
  @Input()
  period: string;
  @Input()
  dashboard: string;
  @Input()
  dataItemValue: any;
  displayText: string;

  constructor() {}
  ngOnInit() {
    this.displayText = this.textIdentifier();
  }

  textIdentifier(): string {
    if (this.dataElement.name == 'OrgUnit') {
      return this.orgUnit;
    } else if (this.dataElement.name == 'Period') {
      return this.period;
    } else if (this.dataElement.name == 'Intervention') {
      return this.dashboard;
    } else {
      return this.dataElement.name;
    }
  }
}
