import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@hisptz/ngx-dhis2-http-client';
import { RootCauseAnalysisConfigurationsService } from './root-cause-analysis-configurations.service';
import { catchError, switchMap } from 'rxjs/operators';
import { throwError, forkJoin, of } from 'rxjs';
import * as _ from 'lodash';
import { RootCauseAnalysisData } from '../models/root-cause-analysis-data.model';
@Injectable({
  providedIn: 'root'
})
export class RootCauseAnalysisDataService {
  configurationId: string;
  private _dataStoreUrl = 'dataStore/rca-data';
  constructor(
    private http: NgxDhis2HttpClientService,
    public rcaConfigurationService: RootCauseAnalysisConfigurationsService
  ) {
    this.configurationId = rcaConfigurationService.getConfigurationId();
  }

  addRootCauseAnalysisData(
    rootCauseAnalysisData,
    orgUnitId,
    periodId,
    dashBoardId
  ) {
    return this.http.post(
      `${this._dataStoreUrl}/${
        rootCauseAnalysisData.configurationId
      }_${orgUnitId}_${periodId}_${dashBoardId}_${rootCauseAnalysisData.id}`,
      rootCauseAnalysisData
    );
  }

  deleteRootCauseAnalysisData(
    rootCauseAnalysisData,
    orgUnitId,
    periodId,
    dashBoardId
  ) {
    return this.http.delete(
      `${this._dataStoreUrl}/${
        rootCauseAnalysisData.configurationId
      }_${orgUnitId}_${periodId}_${dashBoardId}_${rootCauseAnalysisData.id}`
    );
  }

  updateRootCauseAnalysisData(
    rootCauseAnalysisData: RootCauseAnalysisData,
    orgUnitId,
    periodId,
    dashBoardId
  ) {
    return this.http.put(
      `${this._dataStoreUrl}/${
        rootCauseAnalysisData.configurationId
      }_${orgUnitId}_${periodId}_${dashBoardId}_${rootCauseAnalysisData.id}`,
      _.omit(rootCauseAnalysisData, [
        'showEditNotification',
        'isActive',
        'unsaved',
        'savingColor',
        'isNew'
      ])
    );
  }

  saveRootCauseAnalysisData(
    rootCauseAnalysisData: RootCauseAnalysisData,
    orgUnitId,
    periodId,
    dashBoardId
  ) {
    const newRootCauseAnalysisData = _.omit(rootCauseAnalysisData, [
      'showEditNotification',
      'isActive',
      'unsaved',
      'savingColor',
      'isNew'
    ]);

    return this.addRootCauseAnalysisData(
      newRootCauseAnalysisData,
      orgUnitId,
      periodId,
      dashBoardId
    );
  }

  getRootCauseAnalysisData(
    configurationId: string,
    orgUnitId,
    periodId,
    dashBoardId
  ) {
    return this.http.get(this._dataStoreUrl).pipe(
      switchMap((dataIds: string[]) => {
        const filteredDataIds = _.filter(dataIds, (dataId: string) => {
          orgUnitId = 'Hq1ZHMHGvQE';
          const spliteDataId = dataId.split('_');
          return (
            configurationId === spliteDataId[0] &&
            orgUnitId === 'Hq1ZHMHGvQE' &&
            periodId.toString() === spliteDataId[2] &&
            dashBoardId === spliteDataId[3]
          );
        });
        if (filteredDataIds.length > 0) {
          return forkJoin(
            _.map(filteredDataIds, (dataId: string) => {
              return this.http.get(`${this._dataStoreUrl}/${dataId}`);
            })
          );
        } else {
          return of([]);
        }
      }),
      catchError((error: any) => {
        if (error.status !== 404) {
          return throwError(error);
        }
        return of([]);
      })
    );
  }
}
