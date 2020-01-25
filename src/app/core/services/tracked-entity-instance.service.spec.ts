import { TestBed } from '@angular/core/testing';

import { TrackedEntityInstanceService } from './tracked-entity-instance.service';

describe('TrackedEntityInstanceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TrackedEntityInstanceService = TestBed.get(TrackedEntityInstanceService);
    expect(service).toBeTruthy();
  });
});
