import { Injectable } from "@angular/core";
import * as _ from "lodash";
import { NgxDhis2HttpClientService } from "@hisptz/ngx-dhis2-http-client";
import { RootCauseAnalysisConfiguration } from "../store/models/root-cause-analysis-configuration.model";
import { catchError, map, switchMap } from "rxjs/operators";
import { throwError, forkJoin, of } from "rxjs";
import { defaultDataSetElementDetails } from "../constants/default-configurations";

@Injectable({
  providedIn: "root"
})
export class RootCauseAnalysisConfigurationsService {
  private _dataStoreUrl: string;
  constructor(private http: NgxDhis2HttpClientService) {
    this._dataStoreUrl = "dataStore/rca-config";
  }
  getConfigurationId() {
    return "rcaconfig";
  }
  getAllConfigurations(configurationId: string) {
    return this.http.get(this._dataStoreUrl).pipe(
      switchMap((configurationIds: string[]) =>
        forkJoin(
          _.map(configurationIds, (configurationId: string) =>
            this.http.get(`${this._dataStoreUrl}/${configurationId}`)
          )
        )
      ),
      catchError((error: any) => {
        if (error.status !== 404) {
          return throwError(error);
        }

        const configurationObject: RootCauseAnalysisConfiguration = {
          id: configurationId,
          name: "Root Cause Analysis Widget",
          dataElements: defaultDataSetElementDetails
        };
        return this.http
          .post(
            `${this._dataStoreUrl}/${configurationObject.id}`,
            configurationObject
          )
          .pipe(map(() => [configurationObject]));
      })
    );
  }
}
