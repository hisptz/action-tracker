import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgPipesModule } from 'ngx-pipes';

import { components } from './components';
import { containers } from './containers';
import { directives } from './directives';
import { effects } from './store/effects';
import { reducers } from './store/reducers';

@NgModule({
  declarations: [...containers, ...components, ...directives],
  exports: [...containers, ...components, ReactiveFormsModule],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgPipesModule,
    StoreModule.forFeature('actionTrackerWidget', reducers),
    EffectsModule.forFeature(effects)
  ]
})
export class ActionTrackerTableModule {}
