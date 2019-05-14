import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RootCauseAnalysisData } from '../../store/models/root-cause-analysis-data.model';

@Component({
  selector: 'app-widget-context-menu',
  templateUrl: './widget-context-menu.component.html',
  styleUrls: ['./widget-context-menu.component.css']
})
export class WidgetContextMenuComponent implements OnInit {
  @Input()
  x;
  @Input()
  y;
  @Input()
  dataItem: RootCauseAnalysisData;

  @Output()
  openEditForm: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  openDeleteForm: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  onToggleEdit(e, dataItem) {
    if (e) {
      e.stopPropagation();
    }
    const data: RootCauseAnalysisData = dataItem;
    this.openEditForm.emit({
      ...data,
      isActive: true
    });
  }

  onToggleDelete(e, dataItem) {
    if (e) {
      e.stopPropagation();
    }
    const data: RootCauseAnalysisData = dataItem;
    this.openDeleteForm.emit({
      ...data,
      isActive: true
    });
  }
}
