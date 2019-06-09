import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/core/store/reducers';
import { Observable } from 'rxjs';
import { getReportVisualizations } from 'src/app/core/store/selectors/report-visualization.selectors';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  reportVisualizations$: Observable<any[]>;
  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.reportVisualizations$ = this.store.select(getReportVisualizations);
  }
}
