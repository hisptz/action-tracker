import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@hisptz/ngx-dhis2-http-client';
import { RootCauseAnalysisWidget } from '../store/models/root-cause-analysis-widget.model';
import { RootCauseAnalysisConfigurationsService } from '../../../../core/services/root-cause-analysis-configurations.service';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RootCauseAnalysisWidgetService {
  configurationId: string;
  constructor(
    private http: NgxDhis2HttpClientService,
    public rcaConfigurationService: RootCauseAnalysisConfigurationsService
  ) {
    this.configurationId = rcaConfigurationService.getConfigurationId();
  }
  getWidget(widgetId) {
    return this.http.get(`dataStore/rca-widget/${widgetId}`).pipe(
      catchError((error: any) => {
        if (error.status !== 404) {
          return throwError(error);
        }
        const widgetObject: RootCauseAnalysisWidget = {
          id: widgetId,
          configurationId: this.configurationId
        };
        return this.http
          .post('dataStore/rca-widget/' + widgetObject.id, widgetObject)
          .pipe(map(() => widgetObject));
      })
    );
  }
}
