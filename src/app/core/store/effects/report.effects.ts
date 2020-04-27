import { Injectable } from '@angular/core';
import { loadFunctions } from '@iapps/ngx-dhis2-data-filter';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import { of, zip } from 'rxjs';
import { concatMap, map, tap, withLatestFrom } from 'rxjs/operators';

import { getVisualizationLayersFromFavorite } from '../../helpers/get-visualization-layers-from-favorite.helper';
import { RootCauseAnalysisConfiguration } from '../../models/root-cause-analysis-configuration.model';
import { ReportService } from '../../services/report.service';
import { AddCurrentUser, UserActionTypes } from '../actions';
import { addReportVisualizations } from '../actions/report-visualization.actions';
import {
  AddRootCauseAnalysisDatas,
  RootCauseAnalysisDataActionTypes,
} from '../actions/root-cause-analysis-data.actions';
import { State } from '../reducers';
import { getCurrentCalendarId } from '../selectors';
import { getDataSelections } from '../selectors/global-selection.selectors';
import { getCurrentRootCauseAnalysisConfiguration } from '../selectors/root-cause-analysis-configuration.selectors';
import {
  getRootCauseAnalysisDatas,
  getRootCauseDataLoadingCompletionStatus,
} from '../selectors/root-cause-analysis-data.selectors';

@Injectable()
export class ReportEffects {
  @Effect()
  addCurrentUser$ = this.actions$.pipe(
    ofType(UserActionTypes.AddCurrentUser),
    map(({ currentUser }: AddCurrentUser) => loadFunctions({ currentUser }))
  );

  @Effect({ dispatch: false })
  loadRootCauseDataSuccess$ = this.actions$.pipe(
    ofType(RootCauseAnalysisDataActionTypes.AddRootCauseAnalysisDatas),
    concatMap((action) =>
      of(action).pipe(
        withLatestFrom(
          this.store.select(getRootCauseAnalysisDatas),
          this.store.select(getDataSelections),
          this.store.select(getCurrentRootCauseAnalysisConfiguration),
          this.store.select(getRootCauseDataLoadingCompletionStatus),
          this.store.select(getCurrentCalendarId)
        )
      )
    ),
    tap(
      ([
        {},
        rootCauseAnalysisDatas,
        dataSelections,
        rootCauseConfiguration,
        loadingCompletion,
        calendarId,
      ]: [
        AddRootCauseAnalysisDatas,
        any,
        any,
        RootCauseAnalysisConfiguration,
        boolean,
        string
      ]) => {
        if (loadingCompletion) {
          const bottleneckIndicatorConfig = _.find(
            rootCauseConfiguration.dataElements,
            ['name', 'indicatorId']
          );

          const bottleneckIndicatorIds = rootCauseAnalysisDatas.map(
            (rootCauseData: any) => {
              const dataValues = rootCauseData.dataValues || [];
              return dataValues[
                bottleneckIndicatorConfig ? bottleneckIndicatorConfig.id : ''
              ];
            }
          );

          const interventionItems = _.flatten(
            _.flatten(
              dataSelections
                .filter(
                  (dataSelection: any) =>
                    dataSelection.dimension === 'intervention'
                )
                .map((dataSelection: any) => {
                  const interventions = dataSelection.items || [];
                  return interventions.map((intervention: any) => {
                    return intervention.dashboardItems
                      .filter(
                        (dashboardItem: any) => dashboardItem.type === 'CHART'
                      )
                      .map((dashboardItem: any) => {
                        return {
                          ...dashboardItem,
                          id: intervention.id,
                          bottleneckPeriodType:
                            intervention.bottleneckPeriodType,
                          name: intervention.name,
                        };
                      });
                  });
                })
            )
          );
          zip(
            ...interventionItems.map((interventionItem: any) =>
              this.reportService.loadFavorite(interventionItem)
            )
          )
            .pipe(
              map((favorites: any[]) => {
                return favorites.map((favorite: any) => {
                  const visualizationLayers = getVisualizationLayersFromFavorite(
                    favorite,
                    dataSelections,
                    bottleneckIndicatorIds,
                    calendarId
                  );
                  return {
                    id: favorite.id,
                    type: 'CHART',
                    isNonVisualizable: false,
                    name: favorite.name,
                    uiConfig: {
                      shape: 'NORMAL',
                      height: '85vh',
                      width:
                        (window.innerWidth ||
                          document.documentElement.clientWidth ||
                          document.body.clientWidth) - 100,
                      showBody: true,
                      showFilters: false,
                      hideFooter: true,
                      hideHeader: false,
                      hideManagementBlock: true,
                      hideTypeButtons: true,
                      showInterpretionBlock: true,
                      hideResizeButtons: false,
                      showTitleBlock: false,
                    },
                    layers: visualizationLayers,
                  };
                });
              })
            )
            .subscribe((visualizations: any[]) => {
              this.store.dispatch(addReportVisualizations({ visualizations }));
            });
        }
      }
    )
  );
  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private reportService: ReportService
  ) {}
}
