import { Injectable } from "@angular/core";
import { NgxDhis2HttpClientService } from "@iapps/ngx-dhis2-http-client";
import { switchMap, catchError, map } from "rxjs/operators";
import * as _ from "lodash";
import { zip, of, throwError } from "rxjs";
import { generateUid } from "../helpers/generate-uid.helper";

@Injectable({
  providedIn: "root"
})
export class ActionTrackerDataService {
  private _dataStoreUrl = "dataStore/action-tracker-data";
  constructor(private http: NgxDhis2HttpClientService) {}

  getData(configurationId: string, orgUnitId, periodId, dashBoardId) {
    return this.http.get(this._dataStoreUrl).pipe(
      switchMap((dataIds: string[]) => {
        if (dataIds.length > 0) {
          return zip(
            ..._.map(dataIds, (dataId: string) => {
              return this.http.get(`${this._dataStoreUrl}/${dataId}`);
            })
          );
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
    if (!actionTrackerDataValues && !selectionParams) {
      console.warn(
        "Could not save action tracker data, data values and parameters are not supplied"
      );
      return of(null);
    }
    const actionTrackerData = this._prepareDataForSaving(
      actionTrackerDataValues,
      actionTrackerConfig,
      selectionParams.rootCauseDataId
    );

    return this.http
      .post(
        `${this._dataStoreUrl}/${actionTrackerConfig.id}_${selectionParams.orgUnit}_${selectionParams.period}_${selectionParams.dashboard}_${actionTrackerData.id}`,
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
    if (!actionTrackerDataValues && !selectionParams) {
      console.warn(
        "Could not save action tracker data, data values and parameters are not supplied"
      );
      return of(null);
    }
    const actionTrackerData = this._prepareDataForSaving(
      actionTrackerDataValues,
      actionTrackerConfig,
      selectionParams.rootCauseDataId,
      actionTrackerDataId
    );
    return this.http
      .put(
        `${this._dataStoreUrl}/${actionTrackerConfig.id}_${selectionParams.orgUnit}_${selectionParams.period}_${selectionParams.dashboard}_${actionTrackerData.id}`,
        actionTrackerData
      )
      .pipe(map(() => actionTrackerData));
  }

  deleteData(
    actionTrackerConfig,
    actionTrackerDataValues,
    selectionParams: any,
    actionTrackerDataId: string
  ) {
    if (!actionTrackerDataValues && !selectionParams) {
      console.warn(
        "Could not delete action tracker data, data values and parameters are not supplied"
      );
      return of(null);
    }

    return this.http.delete(
      `${this._dataStoreUrl}/${actionTrackerConfig.id}_${selectionParams.orgUnit}_${selectionParams.period}_${selectionParams.dashboard}_${actionTrackerDataId}`
    );
  }

  private _prepareDataForSaving(
    actionTrackerDataValues: any,
    actionTrackerConfig: any,
    rootCauseDataId: string,
    dataId?: string
  ) {
    const dataValueId = dataId || generateUid();
    return {
      id: dataValueId,
      dataValues: actionTrackerDataValues,
      rootCauseDataId,
      actionTrackerConfigId: actionTrackerConfig.id
    };
  }
}
