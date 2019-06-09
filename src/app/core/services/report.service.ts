import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private _favoriteDataStoreNamespace: string;
  constructor(private http: NgxDhis2HttpClientService) {
    this._favoriteDataStoreNamespace = 'dataStore/favorites';
  }

  loadFavorite(favoriteId: string) {
    if (favoriteId === '') {
      return of(null);
    }
    return this.http.get(`${this._favoriteDataStoreNamespace}/${favoriteId}`);
  }
}
