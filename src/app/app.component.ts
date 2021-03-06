import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { State } from 'src/app/core/store/reducers';

import { UpsertDataSelectionsAction } from './core/store/actions/global-selection.actions';
import { getRouteUrl } from './core/store/selectors';
import { SelectionFilterConfig } from './shared/modules/selection-filters/models/selected-filter-config.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  routeParams = {
    dashboardItemId: 'rcawidget',
  };
  configurationId = 'rcaconfig';

  dataSelections$: Observable<any>;
  selectedOrgUnit$: Observable<string>;
  selectedPeriod$: Observable<string>;
  legend$: Observable<any>;
  route$: Observable<any>;
  selectionFilterConfig: SelectionFilterConfig = {
    orgUnitFilterConfig: {
      singleSelection: true,
      showOrgUnitLevelGroupSection: false,
      showUserOrgUnitSection: false,
    },
    periodFilterConfig: {
      singleSelection: true,
      allowDateRangeSelection: false,
      emitOnSelection: true,
    },
  };

  isLinear: false;
  constructor(
    private store: Store<State>,
    private translate: TranslateService,
    private titleService: Title
  ) {
    // this language will be used as a fallback when a translation isn't found in the current language
    this.translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    this.translate.use('en');

    // Set application title
    this.setTitle('Action Tracker');
    this.route$ = this.store.select(getRouteUrl(true));
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  onFilterUpdate(dataSelections) {
    this.store.dispatch(new UpsertDataSelectionsAction(dataSelections));
  }
}
