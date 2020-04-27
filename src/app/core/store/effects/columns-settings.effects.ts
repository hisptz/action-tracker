import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ActionTrackerConfigurationService } from '../../services';
import { State } from '../reducers';

export class ColumsSettingsEffects {
  @Effect()
  loadColumnSetting: Observable<any>;

  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private actionTrackerConfigService: ActionTrackerConfigurationService
  ) {}
}
