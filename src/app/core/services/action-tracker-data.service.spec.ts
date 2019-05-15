import { TestBed } from '@angular/core/testing';

import { ActionTrackerDataService } from './action-tracker-data.service';
import { HttpClientModule } from '@angular/common/http';

describe('ActionTrackerDataService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    })
  );

  it('should be created', () => {
    const service: ActionTrackerDataService = TestBed.get(
      ActionTrackerDataService
    );
    expect(service).toBeTruthy();
  });
});
