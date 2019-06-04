import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ContextMenuModule } from 'ngx-contextmenu';
import { NgPipesModule } from 'ngx-pipes';

import { components } from './components';
import { containers } from './containers';
import { directives } from './directives';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [...containers, ...components, ...directives],
  exports: [...containers, ReactiveFormsModule],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    NgbDatepickerModule,
    ContextMenuModule.forRoot(),
    NgPipesModule
  ]
})
export class ActionTrackerTableModule {}
