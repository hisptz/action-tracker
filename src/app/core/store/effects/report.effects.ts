import { Injectable } from '@angular/core';
import { LoadFunctions } from '@iapps/ngx-dhis2-data-filter';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import { forkJoin, of } from 'rxjs';
import { concatMap, map, tap, withLatestFrom } from 'rxjs/operators';

import { generateUid } from '../../helpers/generate-uid.helper';
import { getVisualizationLayersFromFavorite } from '../../helpers/get-visualization-layers-from-favorite.helper';
import { RootCauseAnalysisConfiguration } from '../../models/root-cause-analysis-configuration.model';
import { ReportService } from '../../services/report.service';
import { AddCurrentUser, UserActionTypes } from '../actions';
import { addReportVisualizations } from '../actions/report-visualization.actions';
import {
  AddRootCauseAnalysisDatas,
  RootCauseAnalysisDataActionTypes
} from '../actions/root-cause-analysis-data.actions';
import { State } from '../reducers';
import { getDataSelections } from '../selectors/global-selection.selectors';
import { getCurrentRootCauseAnalysisConfiguration } from '../selectors/root-cause-analysis-configuration.selectors';
import { getRootCauseDataLoadingCompletionStatus } from '../selectors/root-cause-analysis-data.selectors';

@Injectable()
export class ReportEffects {
  @Effect()
  addCurrentUser$ = this.actions$.pipe(
    ofType(UserActionTypes.AddCurrentUser),
    map((action: AddCurrentUser) => new LoadFunctions(action.currentUser))
  );

  @Effect({ dispatch: false })
  loadRootCauseDataSuccess$ = this.actions$.pipe(
    ofType(RootCauseAnalysisDataActionTypes.AddRootCauseAnalysisDatas),
    concatMap(action =>
      of(action).pipe(
        withLatestFrom(
          this.store.select(getDataSelections),
          this.store.select(getCurrentRootCauseAnalysisConfiguration),
          this.store.select(getRootCauseDataLoadingCompletionStatus)
        )
      )
    ),
    tap(
      ([action, dataSelections, rootCauseConfiguration, loadingCompletion]: [
        AddRootCauseAnalysisDatas,
        any,
        RootCauseAnalysisConfiguration,
        boolean
      ]) => {
        if (loadingCompletion) {
          const bottleneckIndicatorConfig = _.find(
            rootCauseConfiguration.dataElements,
            ['name', 'indicatorId']
          );
          const bottleneckIndicatorIds = action.rootCauseAnalysisDatas.map(
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
                          name: intervention.name
                        };
                      });
                  });
                })
            )
          );

          forkJoin(
            interventionItems.map((interventionItem: any) =>
              this.reportService.loadFavorite(
                interventionItem.chart ? interventionItem.chart.id : '',
                interventionItem.name
              )
            )
          )
            .pipe(
              map((favorites: any[]) => {
                return favorites.map((favorite: any) => {
                  const visualizationLayers = getVisualizationLayersFromFavorite(
                    favorite,
                    dataSelections,
                    bottleneckIndicatorIds
                  );
                  return {
                    id: generateUid(),
                    type: 'CHART',
                    isNonVisualizable: false,
                    name: favorite.name,
                    uiConfig: {
                      shape: 'NORMAL',
                      height: '450px',
                      width: 'span 12',
                      showBody: true,
                      showFilters: false,
                      hideFooter: true,
                      hideHeader: false,
                      hideManagementBlock: true,
                      hideTypeButtons: true,
                      showInterpretionBlock: true,
                      hideResizeButtons: true,
                      showTitleBlock: false
                    },
                    layers: visualizationLayers
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
