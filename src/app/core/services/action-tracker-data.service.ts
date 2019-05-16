import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { switchMap, catchError, map } from 'rxjs/operators';
import * as _ from 'lodash';
import { forkJoin, of, throwError } from 'rxjs';
import { generateUid } from '../helpers/generate-uid.helper';

@Injectable({
  providedIn: 'root'
})
export class ActionTrackerDataService {
  private _dataStoreUrl = 'dataStore/action-tracker-data';
  constructor(private http: NgxDhis2HttpClientService) {}

  getData(configurationId: string, orgUnitId, periodId, dashBoardId) {
    return this.http.get(this._dataStoreUrl).pipe(
      switchMap((dataIds: string[]) => {
        const filteredDataIds = _.filter(dataIds, (dataId: string) => {
          const spliteDataId = dataId.split('_');

          return (
            configurationId === spliteDataId[0] &&
            orgUnitId === spliteDataId[1] &&
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

  addData(actionTrackerConfig, actionTrackerDataValues, selectionParams: any) {
    const actionTrackerData = this._prepareDataForSaving(
      actionTrackerDataValues,
      actionTrackerConfig
    );
    return this.http
      .post(
        `${this._dataStoreUrl}/${actionTrackerConfig.id}_${
          selectionParams.orgUnitId
        }_${selectionParams.periodId}_${selectionParams.dashboardId}_${
          actionTrackerData.id
        }`,
        actionTrackerData
      )
      .pipe(map(() => actionTrackerData));
  }

  updateData(
    actionTrackerConfig,
    actionTrackerDataValues,
    selectionParams: any,
    actionTrackerDataId: string
  ) {
    const actionTrackerData = this._prepareDataForSaving(
      actionTrackerDataValues,
      actionTrackerConfig,
      actionTrackerDataId
    );
    return this.http
      .put(
        `${this._dataStoreUrl}/${actionTrackerConfig.id}_${
          selectionParams.orgUnitId
        }_${selectionParams.periodId}_${selectionParams.dashboardId}_${
          actionTrackerData.id
        }`,
        actionTrackerData
      )
      .pipe(map(() => actionTrackerData));
  }

  private _prepareDataForSaving(
    actionTrackerDataValues: any,
    actionTrackerConfig: any,
    dataId?: string
  ) {
    const dataValueId = dataId || generateUid();
    return {
      id: dataValueId,
      dataValues: actionTrackerDataValues,
      rootCauseId: actionTrackerConfig.rootCauseConfigurationId,
      actionTrackerConfigId: actionTrackerConfig.id
    };
  }
}
