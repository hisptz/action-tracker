import { Injectable } from '@angular/core';
import { zip, of, throwError } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';

import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class TrackedEntityInstanceService {
  teiUrl: string;

  constructor(private http: NgxDhis2HttpClientService) {
    this.teiUrl = 'trackedEntityInstances';
  }

  discoveringSavedTEI(rootCauseAnalysisData: any): Observable<any> {
    // TODO replace program id and referrence attribute id
    const programId = 'ROSaojkGieB';
    const referrencedAttributeId = 'blOw6mjuv6j';
    const attributeValues = _.filter(
      _.flattenDeep(
        _.map(rootCauseAnalysisData, (data: any) => {
          const id =
            typeof data === 'object' && data && data.id ? data.id : data;
          return typeof id === 'string' ? id : '';
        })
      ),
      (id: string) => id.trim() !== ''
    );
    return new Observable(observer => {
      this.getSearchedTrackedEntityInstances(
        referrencedAttributeId,
        programId,
        attributeValues
      ).subscribe(d => {
        observer.next(d);
        observer.complete();
      });
    });
  }

  getSearchedTrackedEntityInstances(
    referrencedAttributeId: string,
    programId: string,
    attributeValues: string[]
  ) {
    console.log({ referrencedAttributeId, programId, attributeValues });
    return attributeValues && attributeValues.length > 0
      ? zip(
          ..._.map(attributeValues, (attributeValue: string) => {
            return this.http
              .get(
                `${this.teiUrl}/query.json?ouMode=ACCESSIBLE&program=${programId}&filter=${referrencedAttributeId}:EQ:${attributeValue}`
              )
              .pipe(
                switchMap((teIResponse: any) => {
                  const trackeEntityInstanceIds = this.getTEIIdsFromQueryResponse(
                    teIResponse
                  );
                  if (trackeEntityInstanceIds.length > 0) {
                    return zip(
                      ..._.map(
                        trackeEntityInstanceIds,
                        (trackeEntityInstanceId: string) => {
                          console.log({ trackeEntityInstanceId });
                          return this.http.get(
                            `${this.teiUrl}/${trackeEntityInstanceId}.json?program=${programId}&fields=*`
                          );
                        }
                      )
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
          })
        )
      : of([]);
  }

  getTEIIdsFromQueryResponse(response: any) {
    const { headers, rows } = response;
    const column = 'column';
    const columnValue = 'Instance';
    const teiIdColumnIndex = _.findIndex(
      headers,
      (data: any) => data[column].toLowerCase() === columnValue.toLowerCase()
    );
    // // TODO get TEI ids
    console.log({ headers, rows, teiIdColumnIndex });
    return ['cOMxktzGXJO'];
  }
}
