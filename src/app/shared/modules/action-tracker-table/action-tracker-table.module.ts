import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ContextMenuModule } from 'ngx-contextmenu';
import { NgPipesModule } from 'ngx-pipes';

import { components } from './components';
import { containers } from './containers';
import { directives } from './directives';
import { effects } from './store/effects';
import { reducers } from './store/reducers';
import { DatePickerComponent } from './components/date-picker/date-picker.component';

@NgModule({
  declarations: [...containers, ...components, ...directives, DatePickerComponent],
  exports: [...containers, ...components, ReactiveFormsModule],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    NgbDatepickerModule,
    ContextMenuModule.forRoot(),
    NgPipesModule,
    StoreModule.forFeature('actionTrackerWidget', reducers),
    EffectsModule.forFeature(effects)
  ]
})
export class ActionTrackerTableModule {}
