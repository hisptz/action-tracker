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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';

import { NgxDhis2DataFilterModule } from '@iapps/ngx-dhis2-data-filter';

import { components, entryComponents } from './components';
import { modules } from './modules';
import { pipes } from './pipes';
import { NotificationSnackbarComponent } from './components/notification-snackbar/notification-snackbar.component';
import { ExportBarComponent } from './components/export-bar/export-bar.component';
import { TableColumnConfigDialogComponent } from './dialogs/table-column-config-dialog/table-column-config-dialog.component';
import { MatCheckboxModule } from '@angular/material';
import { FilterPipe } from './pipes/filter.pipe';
import { FormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    ...modules,

    NgxDhis2DataFilterModule,
    FormsModule,
    MatCardModule,
    MatProgressBarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatStepperModule,
    MatCheckboxModule
  ],
  entryComponents: [...entryComponents, TableColumnConfigDialogComponent],
  exports: [
    ...modules,
    ...components,
    ...pipes,
    NgxDhis2DataFilterModule,
    FormsModule,
    MatCardModule,
    MatProgressBarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatStepperModule,
    MatCheckboxModule,
    FilterPipe
  ],
  declarations: [
    ...components,
    ...pipes,
    NotificationSnackbarComponent,
    ExportBarComponent,
    TableColumnConfigDialogComponent,
    FilterPipe
  ]
})
export class SharedModule {}
