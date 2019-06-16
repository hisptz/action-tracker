import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from 'src/app/core/store/reducers';
import { getDataSelectionStatus } from 'src/app/core/store/selectors/global-selection.selectors';
import {
  getReportVisualizations,
  getReportVisualizationLoadingStatus
} from 'src/app/core/store/selectors/report-visualization.selectors';

@Component({
  selector: 'app-anaylsis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.css']
})
export class AnalysisComponent implements OnInit {
  reportVisualizations$: Observable<any[]>;
  selectionSet$: Observable<boolean>;
  visualizationsLoading$: Observable<boolean>;
  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.reportVisualizations$ = this.store.select(getReportVisualizations);
    this.selectionSet$ = this.store.select(getDataSelectionStatus);
    this.visualizationsLoading$ = this.store.select(
      getReportVisualizationLoadingStatus
    );
  }
}
