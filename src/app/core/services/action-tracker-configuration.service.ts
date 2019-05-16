import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { of, throwError } from 'rxjs';
import { catchError, mergeMap, map, switchMap } from 'rxjs/operators';
import { HandlerService } from './handler.service';
import { defaultDataSetElements } from '../defaults/configuration-dataelements.default';

@Injectable({
  providedIn: 'root'
})
export class ActionTrackerConfigurationService {
  private _dataStoreUrl: string;
  private _actionTrackerConfig: any;
  constructor(private http: NgxDhis2HttpClientService) {
    this._dataStoreUrl = 'dataStore/action-tracker-configuration';
    this._actionTrackerConfig = {
      id: 'actiontrackerconfig',
      rootCauseConfigurationId: 'rcaconfig',
      dataElements: defaultDataSetElements
    };
  }

  findById(configId: string) {
    return this.http.get(`${this._dataStoreUrl}/${configId}`).pipe(
      catchError((error: any) => HandlerService.handleError(error, false)),
      switchMap((res: any) => {
        if (!res) {
          return this.add(this._actionTrackerConfig);
        }

        return of(res);
      })
    );
  }

  add(actionTrackerConfig: any) {
    return this.http
      .post(
        `${this._dataStoreUrl}/${actionTrackerConfig.id}`,
        actionTrackerConfig
      )
      .pipe(
        map(() => actionTrackerConfig),
        catchError((error: any) => {
          console.warn(
            'Problem creating action tracker configuration: ' + error.message
          );
          return of(actionTrackerConfig);
        })
      );
  }
}
