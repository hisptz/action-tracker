import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TableFieldsSettingsService {
  private dataStoreUrl: string;
  private tableSettingsNamespace: string;
  private mandatorySettingsKey: string;
  constructor(private http: NgxDhis2HttpClientService) {
    this.dataStoreUrl = 'dataStore';
    this.tableSettingsNamespace = 'table-fields-settings';
    this.mandatorySettingsKey = 'fields-mandatory-settings';
  }
  getDatastoreNamespaces(): Observable<any> {
    return this.http.get(`${this.dataStoreUrl}`);
  }
  getTableFieldsSettingsNamespaceKeys(): Observable<any> {
    return this.http.get(`${this.dataStoreUrl}/${this.tableSettingsNamespace}`);
  }
  createMandatorySettingsKey(data = { fieldsSettings: [] }): Observable<any> {
    return this.http.post(
      `${this.dataStoreUrl}/${this.tableSettingsNamespace}/${this.mandatorySettingsKey}`,
      data
    );
  }
  updateMandatorySettingsData(data): Observable<any> {
    return this.http.put(
      `${this.dataStoreUrl}/${this.tableSettingsNamespace}/${this.mandatorySettingsKey}`,
      data
    );
  }
  getMandatoryFieldsSettings() {
    return this.http.get(
      `${this.dataStoreUrl}/${this.tableSettingsNamespace}/${this.mandatorySettingsKey}`
    );
  }
}
