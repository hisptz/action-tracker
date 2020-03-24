import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private _favoriteDataStoreNamespace: string;
  constructor(private http: NgxDhis2HttpClientService) {
    this._favoriteDataStoreNamespace = 'dataStore/favorites';
  }

  loadFavorite(
    favoriteId: string,
    bottleneckPeriodType: string,
    favoriteName?: string
  ) {
    if (favoriteId === '') {
      return of(null);
    }
    return this.http
      .get(`${this._favoriteDataStoreNamespace}/${favoriteId}`)
      .pipe(
        map((favorite: any) => {
          return { ...favorite, name: favoriteName, bottleneckPeriodType };
        })
      );
  }
}
