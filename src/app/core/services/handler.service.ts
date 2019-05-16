import { throwError, of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class HandlerService {
  static handleError(error, returnArray: boolean = true) {
    if (error.status !== 404) {
      return throwError(error);
    }

    return returnArray ? of([]) : of(null);
  }
}
