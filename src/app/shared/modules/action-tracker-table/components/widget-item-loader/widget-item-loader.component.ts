import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-widget-item-loader',
  templateUrl: './widget-item-loader.component.html',
  styleUrls: ['./widget-item-loader.component.css']
})
export class WidgetItemLoaderComponent implements OnInit {
  @Input()
  borderRadius: string;

  @Input()
  height: string;
  constructor() {
    this.height = '100%';
  }

  ngOnInit() {}
}
