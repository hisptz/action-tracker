import { Injectable } from '@angular/core';
import { Observable, zip } from 'rxjs';
import { User } from '../models/user.model';
import { NgxDhis2HttpClientService } from '@hisptz/ngx-dhis2-http-client';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private httpClient: NgxDhis2HttpClientService) {}

  /**
   * Load current user information
   */
  loadCurrentUser(): Observable<User> {
    return zip(
      this.httpClient.get(
        'me.json?fields=id,name,userGroups,displayName,created,lastUpdated,' +
          'email,dataViewOrganisationUnits[id,name,level],organisationUnits' +
          '[id,name,level],userCredentials[username]'
      ),
      this.httpClient.get('me/authorization')
    ).pipe(
      map((currentUserResults: any[]) => {
        return { ...currentUserResults[0], authorities: currentUserResults[1] };
      })
    );
  }
}
