import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ColorPickerModule } from 'ngx-color-picker';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { legendSetReducer } from './store/reducers/legend-set.reducer';
import { LegendSetEffects } from './store/effects/legend-set.effects';

import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

import { components } from './components';
import { containers } from './containers';
import { LegendSetConfigurationComponent } from './legend-set-configuration.component';
import { services } from './services';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatTooltipModule,
    HttpClientModule,
    ColorPickerModule,
    StoreModule.forFeature('legendSet', legendSetReducer),
    EffectsModule.forFeature([LegendSetEffects])
  ],
  declarations: [LegendSetConfigurationComponent, ...components, ...containers],
  exports: [LegendSetConfigurationComponent, ...components, ...containers],
  providers: [...services]
})
export class LegendSetConfigurationModule {}
