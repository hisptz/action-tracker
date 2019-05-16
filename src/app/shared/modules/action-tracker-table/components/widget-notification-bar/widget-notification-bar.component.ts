import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-widget-notification-bar',
  templateUrl: './widget-notification-bar.component.html',
  styleUrls: ['./widget-notification-bar.component.css']
})
export class WidgetNotificationBarComponent implements OnInit {
  @Input()
  notification;

  @Output()
  resetNotification: EventEmitter<any> = new EventEmitter<any>();
  constructor() {}

  ngOnInit() {
    setTimeout(() => {
      this.resetNotification.emit({
        message: null
      });
    }, 3000);
  }
}
