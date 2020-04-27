import { TestBed } from '@angular/core/testing';

import { FieldsSettingsService } from './table-fields-settings.service';

describe('FieldsSettingsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FieldsSettingsService = TestBed.get(FieldsSettingsService);
    expect(service).toBeTruthy();
  });
});
