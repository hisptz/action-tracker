import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ActionTrackerDataEffects } from './action-tracker-data.effects';

describe('ActionTrackerDataEffects', () => {
  let actions$: Observable<any>;
  let effects: ActionTrackerDataEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ActionTrackerDataEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(ActionTrackerDataEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
