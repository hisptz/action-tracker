import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { Observable } from 'rxjs';

import { metaReducers, reducers } from '../reducers';
import { ActionTrackerConfigurationEffects } from './action-tracker-configuration.effects';
import { HttpClientModule } from '@angular/common/http';

describe('ActionTrackerConfigurationEffects', () => {
  let actions$: Observable<any>;
  let effects: ActionTrackerConfigurationEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        StoreModule.forRoot(reducers, { metaReducers })
      ],
      providers: [
        ActionTrackerConfigurationEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(ActionTrackerConfigurationEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
