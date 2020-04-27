import { TestBed } from '@angular/core/testing';

import { TableFieldsSettingsService } from './table-fields-settings.service';

describe('FieldsSettingsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TableFieldsSettingsService = TestBed.get(TableFieldsSettingsService);
    expect(service).toBeTruthy();
  });
});
