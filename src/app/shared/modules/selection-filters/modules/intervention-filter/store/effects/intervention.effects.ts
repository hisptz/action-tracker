import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { withLatestFrom, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { InterventionService } from '../../services/intervention.service';
import { State } from '../reducers/intervention.reducer';
import {
  InterventionActionTypes,
  LoadInterventions,
  LoadInterventionsInitiated,
  AddInterventions,
  LoadInterventionsFail
} from '../actions/intervention.actions';
import { getInterventionsInitiatedStatus } from '../selectors/intervention.selectors';
import * as fromCoreStoreReducers from 'src/app/core/store/reducers';
import * as fromCoreStoreSelectors from 'src/app/core/store/selectors';
import { getFilteredInterventionsBasedOnSharing } from '../../helpers/getInterventionsBasedOnSharingSettings.helper';
@Injectable()
export class InterventionEffects {
  @Effect({ dispatch: false })
  loadInterventions$: Observable<any> = this.actions$.pipe(
    ofType(InterventionActionTypes.LoadInterventions),
    withLatestFrom(
      this.interventionStore.select(getInterventionsInitiatedStatus),
      this.coreStore.select(fromCoreStoreSelectors.getCurrentUser),
      this.coreStore.select(fromCoreStoreSelectors.getSystemInfo)
    ),
    tap(
      ([action, interventionInitiated, currentUser, systemInfo]: [
        LoadInterventions,
        boolean,
        any,
        any
      ]) => {
        if (!interventionInitiated) {
          this.interventionStore.dispatch(new LoadInterventionsInitiated());
          this.interventionService.loadAll().subscribe(
            (interventions: any[]) => {
              this.interventionStore.dispatch(
                new AddInterventions(
                  getFilteredInterventionsBasedOnSharing(
                    interventions,
                    currentUser
                  )
                )
              );
            },
            (error: any) => {
              this.interventionStore.dispatch(new LoadInterventionsFail(error));
            }
          );
        }
      }
    )
  );

  constructor(
    private actions$: Actions,
    private interventionService: InterventionService,
    private interventionStore: Store<State>,
    private coreStore: Store<fromCoreStoreReducers.State>
  ) {}
}
