import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { RootCauseAnalysisConfigurationsService } from './root-cause-analysis-configurations.service';
import { catchError, switchMap, take } from 'rxjs/operators';
import { throwError, zip, of, Observable } from 'rxjs';
import * as _ from 'lodash';
import { RootCauseAnalysisData } from '../models/root-cause-analysis-data.model';
@Injectable({
  providedIn: 'root',
})
export class RootCauseAnalysisDataService {
  configurationId: string;
  private _dataStoreUrl = 'dataStore/hisptz-bna-rcadata';
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
      `${this._dataStoreUrl}/${rootCauseAnalysisData.configurationId}_${orgUnitId}_${periodId}_${dashBoardId}_${rootCauseAnalysisData.id}`,
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
      `${this._dataStoreUrl}/${rootCauseAnalysisData.configurationId}_${orgUnitId}_${periodId}_${dashBoardId}_${rootCauseAnalysisData.id}`
    );
  }

  updateRootCauseAnalysisData(
    rootCauseAnalysisData: RootCauseAnalysisData,
    orgUnitId,
    periodId,
    dashBoardId
  ) {
    return this.http.put(
      `${this._dataStoreUrl}/${rootCauseAnalysisData.configurationId}_${orgUnitId}_${periodId}_${dashBoardId}_${rootCauseAnalysisData.id}`,
      _.omit(rootCauseAnalysisData, [
        'showEditNotification',
        'isActive',
        'unsaved',
        'savingColor',
        'isNew',
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
      'isNew',
    ]);

    return this.addRootCauseAnalysisData(
      newRootCauseAnalysisData,
      orgUnitId,
      periodId,
      dashBoardId
    );
  }

  getRootCauseAnalysisData(
    dashBoardId,
    period
  ) {
    return this.http.get(`${this._dataStoreUrl}/${dashBoardId}_rcadata`)
    .pipe(
      switchMap((data: any[]) => {
        let dataFiltered = _.filter([..._.uniq([..._.flattenDeep(data)])],function (singleRootCauseObject){
          return singleRootCauseObject['dataValues']['skBBrbmML4S'] === period
        });
        if (dataFiltered.length >0) {
         return zip(...[...dataFiltered].map((rootCauseObject)=>{
     let newRootCauseobserver =new Observable((observer)=>{
       observer.next(rootCauseObject);
       observer.unsubscribe()
     })
           return newRootCauseobserver;
         }))
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
