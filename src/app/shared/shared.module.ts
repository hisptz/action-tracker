import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgxDhis2DataFilterModule } from '@iapps/ngx-dhis2-data-filter';

import { components, entryComponents } from './components';
import { modules } from './modules';

@NgModule({
  imports: [
    CommonModule,
    ...modules,
    NgxDhis2DataFilterModule,
    MatCardModule,
    MatProgressBarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  entryComponents: [...entryComponents],
  exports: [
    ...modules,
    ...components,
    NgxDhis2DataFilterModule,
    MatCardModule,
    MatProgressBarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  declarations: [...components]
})
export class SharedModule {}
