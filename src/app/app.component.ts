import { Component, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';

/** RxJS Imports */
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

/** Feature Store Imports */
import { ActionTrackerWidgetState } from './shared/modules/action-tracker-table/store';
import { SetCurrentRootCauseAnalysisWidget } from './shared/modules/action-tracker-table/store/actions/root-cause-analysis-widget.actions';
import { LoadRootCauseAnalysisConfigurations } from './shared/modules/action-tracker-table/store/actions/root-cause-analysis-configuration.actions';

/** Main Store Imports */
import { getQueryParams } from './core/helpers/get-query-params.helper';
import { Go } from './core/store/actions';
import { UpsertDataSelectionsAction } from './core/store/actions/global-selection.actions';
import { State } from './core/store/reducers';
import { getRouterParams, getRouteUrl } from './core/store/selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  routeParams = {
    dashboardItemId: 'rcawidget'
  };
  configurationId = 'rcaconfig';

  routerParams$: Observable<any>;
  selectedOrgUnit$: Observable<string>;
  selectedPeriod$: Observable<string>;

  constructor(
    private store: Store<State>,
    private actionTrackerStore: Store<ActionTrackerWidgetState>,
    private translate: TranslateService,
    private titleService: Title
  ) {
    this.store.select(getRouterParams).subscribe();
    // this language will be used as a fallback when a translation isn't found in the current language
    this.translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    this.translate.use('en');

    // Set application title
    this.setTitle('Seed application');
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);

    this.actionTrackerStore.dispatch(
      new LoadRootCauseAnalysisConfigurations(
        this.configurationId,
        this.routeParams.dashboardItemId
      )
    );

    this.actionTrackerStore.dispatch(
      new SetCurrentRootCauseAnalysisWidget(this.routeParams.dashboardItemId)
    );

    this.routerParams$ = this.store.select(getRouterParams);
  }

  onFilterUpdate(dataSelections) {
    this.store.dispatch(new UpsertDataSelectionsAction(dataSelections));
    const queryParams: any = getQueryParams(dataSelections);
    this.store
      .select(getRouteUrl(true))
      .pipe(take(1))
      .subscribe(routeUrl => {
        this.store.dispatch(
          new Go({
            path: [routeUrl],
            query: {
              orgUnit: queryParams.ou,
              period: queryParams.pe,
              intervention: queryParams.intervention
            }
          })
        );
      });
  }
}
