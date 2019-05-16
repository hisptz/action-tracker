import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { containers } from './containers';
import { services } from './services';
import { reducer } from './store/reducers/intervention.reducer';
import { InterventionEffects } from './store/effects/intervention.effects';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [...containers],
  exports: [...containers],
  imports: [
    FormsModule,
    CommonModule,
    StoreModule.forFeature('intervention', reducer),
    EffectsModule.forFeature([InterventionEffects])
  ],
  providers: [...services]
})
export class InterventionFilterModule {}
