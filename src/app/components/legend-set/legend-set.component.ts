import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from 'src/app/core/store/reducers';

import { getCurrentActionTrackerConfigLegend } from '../../core/store/selectors/action-tracker-configuration.selectors';
@Component({
  selector: 'app-legend',
  templateUrl: './legend-set.component.html',
  styleUrls: ['./legend-set.component.css']
})
export class LegendSetComponent implements OnInit {
  legend$: Observable<any>;

  constructor(private store: Store<State>) {
    this.legend$ = this.store.select(getCurrentActionTrackerConfigLegend);
  }

  ngOnInit() {}
}
