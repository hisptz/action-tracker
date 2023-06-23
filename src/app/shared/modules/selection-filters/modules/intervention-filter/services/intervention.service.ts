import {Injectable} from '@angular/core';
import {NgxDhis2HttpClientService} from '@iapps/ngx-dhis2-http-client';
import {Observable} from 'rxjs';

@Injectable()
export class InterventionService {
  constructor(private http: NgxDhis2HttpClientService) {
  }

  loadAll(settings: any = {namespace: 'hisptz-bna'}): Observable<any[]> {
    return this.http.get('dataStore/hisptz-bna/interventions-summary');
  }
}
