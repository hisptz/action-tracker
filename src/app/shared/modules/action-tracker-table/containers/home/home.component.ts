import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../../../../core/store/reducers';
import { ActionTrackerWidgetState } from '../../store';
import { SetCurrentRootCauseAnalysisWidget } from '../../store/actions/root-cause-analysis-widget.actions';
import { LoadRootCauseAnalysisConfigurationAction } from '../../../../../core/store/actions/root-cause-analysis-configuration.actions';
import { getRouterParams } from '../../../../../core/store/selectors/router.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'action-tracker-table',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  routeParams = {
    dashboardItemId: 'rcawidget'
  };
  configurationId = 'rcaconfig';

  routerParams$: Observable<any>;
  selectedOrgUnit$: Observable<string>;
  selectedPeriod$: Observable<string>;

  constructor(
    private rootStore: Store<State>,
    private actionTrackerStore: Store<ActionTrackerWidgetState>
  ) {
    this.routerParams$ = rootStore.select(getRouterParams);
  }

  ngOnInit() {}
}
