import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule, MatListModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRadioModule } from '@angular/material/radio';
import { NgxDhis2DataFilterModule } from '@iapps/ngx-dhis2-data-filter';

import { components, entryComponents } from './components';
import { ExportBarComponent } from './components/export-bar/export-bar.component';
import { NotificationSnackbarComponent } from './components/notification-snackbar/notification-snackbar.component';
import { TableColumnConfigDialogComponent } from './dialogs/table-column-config-dialog/table-column-config-dialog.component';
import { modules } from './modules';
import { pipes } from './pipes';
import { FilterPipe } from './pipes/filter.pipe';
import { FilterByAttributePipe } from './pipes/filter-by-attribute.pipe';
import { LegendConfigurationDialogComponent } from './dialogs/legend-configuration-dialog/legend-configuration-dialog.component';
import { FieldsSettingsDialogComponent } from './dialogs/fields-settings-dialog/fields-settings-dialog.component';

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
    MatCheckboxModule,
    MatListModule,
    MatRadioModule,
  ],
  entryComponents: [
    ...entryComponents,
    TableColumnConfigDialogComponent,
    LegendConfigurationDialogComponent,
    FieldsSettingsDialogComponent,
  ],
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
    FilterPipe,
    MatListModule,
    MatRadioModule,
    FilterByAttributePipe,
    LegendConfigurationDialogComponent,
  ],
  declarations: [
    ...components,
    ...pipes,
    NotificationSnackbarComponent,
    ExportBarComponent,
    TableColumnConfigDialogComponent,
    LegendConfigurationDialogComponent,
    FilterPipe,
    FilterByAttributePipe,
    LegendConfigurationDialogComponent,
    FieldsSettingsDialogComponent,
  ],
})
export class SharedModule {}
