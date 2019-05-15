import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgPipesModule } from 'ngx-pipes';

import { components } from './components';
import { directives } from './directives';
import { pages } from './containers';
import { effects } from './store/effects';
import { reducers } from './store/reducers';

@NgModule({
  declarations: [...pages, ...components, ...directives],
  exports: [...pages, ...components],
  imports: [
    CommonModule,
    FormsModule,
    NgPipesModule,
    StoreModule.forFeature('actionTrackerWidget', reducers),
    EffectsModule.forFeature(effects)
  ]
})
export class ActionTrackerTableModule {}
