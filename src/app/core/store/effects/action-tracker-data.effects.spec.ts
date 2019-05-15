import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ActionTrackerDataEffects } from './action-tracker-data.effects';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from '../reducers';

describe('ActionTrackerDataEffects', () => {
  let actions$: Observable<any>;
  let effects: ActionTrackerDataEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        StoreModule.forRoot(reducers, { metaReducers })
      ],
      providers: [ActionTrackerDataEffects, provideMockActions(() => actions$)]
    });

    effects = TestBed.get(ActionTrackerDataEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
