import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { State } from '../reducers';
import * as _ from 'lodash';
import {
  AddRootCauseAnalysisDatas,
  RootCauseAnalysisDataActionTypes
} from '../actions/root-cause-analysis-data.actions';
import { concatMap, withLatestFrom, switchMap, map } from 'rxjs/operators';
import { of, from, forkJoin } from 'rxjs';
import { getDataSelections } from '../selectors/global-selection.selectors';
import { getCurrentRootCauseAnalysisConfiguration } from '../selectors/root-cause-analysis-configuration.selectors';
import { RootCauseAnalysisConfiguration } from '../../models/root-cause-analysis-configuration.model';
import { ReportService } from '../../services/report.service';
import { getVisualizationLayersFromFavorite } from '../../helpers/get-visualization-layers-from-favorite.helper';

@Injectable()
export class ReportEffects {
  @Effect()
  loadRootCauseDataSuccess$ = this.actions$.pipe(
    ofType(RootCauseAnalysisDataActionTypes.AddRootCauseAnalysisDatas),
    concatMap(action =>
      of(action).pipe(
        withLatestFrom(
          this.store.select(getDataSelections),
          this.store.select(getCurrentRootCauseAnalysisConfiguration)
        )
      )
    ),
    switchMap(
      ([action, dataSelections, rootCauseConfiguration]: [
        AddRootCauseAnalysisDatas,
        any,
        RootCauseAnalysisConfiguration
      ]) => {
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
                  return intervention.dashboardItems.filter(
                    (dashboardItem: any) => dashboardItem.type === 'CHART'
                  );
                });
              })
          )
        );

        return forkJoin(
          interventionItems.map((interventionItem: any) =>
            this.reportService.loadFavorite(
              interventionItem.chart ? interventionItem.chart.id : ''
            )
          )
        ).pipe(
          map((favorites: any[]) => {
            console.log(
              favorites.map((favorite: any) =>
                getVisualizationLayersFromFavorite(favorite)
              )
            );
            return null;
          })
        );
      }
    )
  );
  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private reportService: ReportService
  ) {}
}
