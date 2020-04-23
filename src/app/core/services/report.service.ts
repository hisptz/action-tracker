import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private _favoriteDataStoreNamespace: string;
  constructor(private http: NgxDhis2HttpClientService) {
    this._favoriteDataStoreNamespace = 'dataStore/favorites';
  }

  loadFavorite(intervention: any) {
    const favoriteId =
      intervention && intervention.chart ? intervention.chart.id : '';
    if (favoriteId === '') {
      return of(null);
    }
    return this.http
      .get(`${this._favoriteDataStoreNamespace}/${favoriteId}`)
      .pipe(
        map((favorite: any) => {
          return {
            ...favorite,
            id: intervention.id,
            name: intervention.name,
            bottleneckPeriodType: intervention.bottleneckPeriodType,
          };
        })
      );
  }
}
