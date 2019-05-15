import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { switchMap, catchError } from 'rxjs/operators';
import * as _ from 'lodash';
import { forkJoin, of, throwError } from 'rxjs';

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
}
