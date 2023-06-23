import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {NgxDhis2HttpClientService} from '@iapps/ngx-dhis2-http-client';
import {LegendSet} from '../models/legend-set';
import {legendSetMetadata} from 'src/app/core/defaults/action-tracker-legendset-metadata';

@Injectable({providedIn: 'root'})
export class LegendSetService {
  constructor(private http: NgxDhis2HttpClientService) {
  }

  // @todo update url to data store
  getLegendSets(): Observable<LegendSet[]> {
    const legendUrl = `dataStore/actionTrackerLegendSets/configuration`;
    return new Observable(observer => {
      this.http.get(legendUrl).subscribe(
        (response: any) => {
          const legendSets = response.legendSets;
          observer.next(legendSets);
          observer.complete();
        },
        () => {
          const legendSets = legendSetMetadata;
          this.http.post(legendUrl, {legendSets}).subscribe(
            () => {
              observer.next(legendSets);
              observer.complete();
            },
            error => {
              observer.error(error);
            }
          );
        }
      );
    });
  }

  updateLegendSets(legendSets: LegendSet[]): Observable<any> {
    const legendUrl = `dataStore/actionTrackerLegendSets/configuration`;
    return this.http.put(legendUrl, {legendSets});
  }
}
