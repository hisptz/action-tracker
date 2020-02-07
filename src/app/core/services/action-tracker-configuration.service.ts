import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { of, throwError } from 'rxjs';
import { catchError, mergeMap, map, switchMap } from 'rxjs/operators';
import { HandlerService } from './handler.service';
import { defaultDataSetElements } from '../defaults/configuration-dataelements.default';
import * as _ from 'lodash';
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
    return this.http
      .get(
        `programs/ROSaojkGieB.json?fields=id,name,trackedEntityType[id],programTrackedEntityAttributes[valueType,displayInList,searchable,sortOrder,mandatory,trackedEntityAttribute[id,name,formName,ValueType,code]],programStages[id,name,repeatable,executionDateLabel,sortOrder,programStageDataElements[displayInReports,compulsory,sortOrder,dataElement[id,name,formName,valueType,description,attributeValues[value,attribute[id,name]],optionSetValue,optionSet[options[id,name,code]]]]]`
      )
      .pipe(
        catchError((error: any) => HandlerService.handleError(error, false)),
        switchMap((res: any) => {
          if (!res) {
            return this.add(this._actionTrackerConfig);
          }

          res.rootCauseConfigurationId = 'rcaconfig';
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
