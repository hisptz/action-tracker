import { Injectable } from '@angular/core';
import { init, getInstance } from 'd2';

@Injectable({ providedIn: 'root' })
export class Dhis2ApiService {
  constructor() {}

  async initialize() {}

  getD2Instance() {
    return getInstance();
  }
}
