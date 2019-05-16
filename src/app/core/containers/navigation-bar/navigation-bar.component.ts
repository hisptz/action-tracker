import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../store/reducers';
import { Observable } from 'rxjs';
import { getRouteUrl } from '../../store/selectors';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {
  currentPage$: Observable<string>;
  constructor(private readonly store: Store<State>) {}

  ngOnInit() {
    this.currentPage$ = this.store.select(getRouteUrl(true));
  }
}
