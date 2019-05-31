import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import * as _ from 'lodash';

import { UpsertDataSelectionsAction } from './core/store/actions/global-selection.actions';
import { State } from './core/store/reducers';
import { getRouterParams } from './core/store/selectors';
import { getDataSelections } from 'src/app/core/store/selectors/global-selection.selectors';

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

  dataSelections$: Observable<any>;
  selectedOrgUnit$: Observable<string>;
  selectedPeriod$: Observable<string>;

  constructor(
    private store: Store<State>,
    private translate: TranslateService,
    private titleService: Title
  ) {
    this.store.select(getRouterParams).subscribe();
    // this language will be used as a fallback when a translation isn't found in the current language
    this.translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    this.translate.use('en');

    // Set application title
    this.setTitle('Action Tracker');
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);

    this.dataSelections$ = this.store.select(getDataSelections);
  }

  onFilterUpdate(dataSelections) {
    const fixedSelections = [];
    _.map(dataSelections, dataSelectionItem => {
      dataSelectionItem.dimension == 'ou'
        ? fixedSelections.push({
            dimension: 'ou',
            items: [
              {
                id: 'GD7TowwI46c',
                name: 'User Org-unit',
                type: 'USER_ORGANISATION_UNIT'
              }
            ],
            changed: true,
            layout: 'columns'
          })
        : fixedSelections.push(dataSelectionItem);
    });

    this.store.dispatch(new UpsertDataSelectionsAction(fixedSelections));
  }
}
