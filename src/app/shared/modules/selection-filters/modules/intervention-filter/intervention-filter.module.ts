import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { containers } from './containers';
import { services } from './services';
import { reducer } from './store/reducers/intervention.reducer';
import { InterventionEffects } from './store/effects/intervention.effects';
import { EffectsModule } from '@ngrx/effects';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FilterPipe } from 'src/app/shared/pipes/filter.pipe';

@NgModule({
  declarations: [...containers, FilterPipe],
  exports: [...containers],
  imports: [
    FormsModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    StoreModule.forFeature('intervention', reducer),
    EffectsModule.forFeature([InterventionEffects])
  ],
  providers: [...services]
})
export class InterventionFilterModule {}
