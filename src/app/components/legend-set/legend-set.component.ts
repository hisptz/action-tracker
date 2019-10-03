import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from 'src/app/core/store/reducers';

import {
  LegendSetState,
  getActionStatusLegendSet
} from '../../shared/modules/selection-filters/modules/legend-set-configuration/store';
@Component({
  selector: 'app-legend',
  templateUrl: './legend-set.component.html',
  styleUrls: ['./legend-set.component.css']
})
export class LegendSetComponent implements OnInit {
  legendSet$: Observable<any>;

  constructor(private store: Store<LegendSetState>) {
    this.legendSet$ = this.store.select(getActionStatusLegendSet);
  }

  ngOnInit() {}
}
