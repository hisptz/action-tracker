import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { SelectionFilterConfig } from 'src/app/shared/modules/selection-filters/models/selected-filter-config.model';

@Component({
  selector: 'app-selection-bar',
  templateUrl: './selection-bar.component.html',
  styleUrls: ['./selection-bar.component.css']
})
export class SelectionBarComponent implements OnInit {
  @Input() selectionFilterConfig: SelectionFilterConfig;
  currentPage$: Observable<string>;

  @Output() filterUpdate: EventEmitter<any> = new EventEmitter<any>();
  constructor() {}

  ngOnInit() {}

  onFilterUpdate(selections: any) {
    this.filterUpdate.emit(selections);
  }
}
