import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

import {NgxDhis2HttpClientService} from '@iapps/ngx-dhis2-http-client';
import {LegendSet} from '../models/legend-set';
import {legendSetMetadata} from 'src/app/core/defaults/action-tracker-legendset-metadata';
import * as _ from 'lodash';

@Injectable({providedIn: 'root'})
export class LegendSetService {
  constructor(private http: NgxDhis2HttpClientService) {
  }

  legendUrl = `dataStore/actionTrackerLegendSets/configuration`;


  // @todo update url to data store
  getLegendSets(): Observable<LegendSet[]> {
    return new Observable(observer => {
      this.http.get(this.legendUrl).subscribe(
        (response: any) => {
          const legendSets = response.legendSets;

          if (_.isEmpty(legendSets)) {
            this.setDefaultLegendSets(observer, true);
            return;
          }
          observer.next(legendSets);
          observer.complete();
        },
        () => {
          this.setDefaultLegendSets(observer);
        }
      );
    });
  }

  setDefaultLegendSets(observer, namespaceExists = false) {
    const legendSets = legendSetMetadata;
    if (namespaceExists) {
      this.http.put(this.legendUrl, {legendSets}).subscribe(
        () => {
          observer.next(legendSets);
          observer.complete();
        },
        error => {
          observer.error(error);
        }
      );
      return;
    }
    this.http.post(this.legendUrl, {legendSets}).subscribe(
      () => {
        observer.next(legendSets);
        observer.complete();
      },
      error => {
        observer.error(error);
      }
    );
  }

  updateLegendSets(legendSets: LegendSet[]): Observable<any> {
    return this.http.put(this.legendUrl, {legendSets});
  }
}
