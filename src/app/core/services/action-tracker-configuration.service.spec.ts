import { TestBed } from '@angular/core/testing';

import { ActionTrackerConfigurationService } from './action-tracker-configuration.service';
import { HttpClientModule } from '@angular/common/http';

describe('ActionTrackerConfigurationService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    })
  );

  it('should be created', () => {
    const service: ActionTrackerConfigurationService = TestBed.get(
      ActionTrackerConfigurationService
    );
    expect(service).toBeTruthy();
  });
});
