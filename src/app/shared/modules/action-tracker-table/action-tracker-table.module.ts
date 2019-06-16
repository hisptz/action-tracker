import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ContextMenuModule } from 'ngx-contextmenu';
import { NgPipesModule } from 'ngx-pipes';

import { components } from './components';
import { containers } from './containers';
import { directives } from './directives';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { ColorizePipe } from './pipes/colorize.pipe';

@NgModule({
  declarations: [...containers, ...components, ...directives, ColorizePipe],
  exports: [...containers, ReactiveFormsModule],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatCardModule,
    MatButtonModule,
    NgbDatepickerModule,
    ContextMenuModule.forRoot(),
    NgPipesModule
  ]
})
export class ActionTrackerTableModule {}
