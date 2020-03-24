import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../store/reducers';
import { Observable } from 'rxjs';
import { getRouteUrl } from '../../store/selectors';

@Component({
  selector: 'app-selection-bar',
  templateUrl: './selection-bar.component.html',
  styleUrls: ['./selection-bar.component.css']
})
export class SelectionBarComponent implements OnInit {
  currentPage$: Observable<string>;
  constructor(private readonly store: Store<State>) {}

  ngOnInit() {
    this.currentPage$ = this.store.select(getRouteUrl(true));
  }
}
