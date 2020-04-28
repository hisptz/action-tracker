import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { SelectionFilterConfig } from 'src/app/shared/modules/selection-filters/models/selected-filter-config.model';
import { LegendConfigurationDialogComponent } from 'src/app/shared/dialogs/legend-configuration-dialog/legend-configuration-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { getCurrentUserManagementAuthoritiesStatus } from '../../store/selectors/user.selectors';
import { Store, select} from '@ngrx/store';
import { State } from '../../store/reducers';
import { FieldsSettingsDialogComponent } from 'src/app/shared/dialogs/fields-settings-dialog/fields-settings-dialog.component';
import { getTableFieldsSettings } from '../../store/selectors/table-fields-settings.selectors';
import { CheckMandatorySettingsExistAction } from '../../store/actions/table-fields-settings.actions';
import { take } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-selection-bar',
  templateUrl: './selection-bar.component.html',
  styleUrls: ['./selection-bar.component.css'],
})
export class SelectionBarComponent implements OnInit {
  @Input() selectionFilterConfig: SelectionFilterConfig;
  currentPage$: Observable<string>;
  isAdmin$: Observable<any>;
  tableFields$: Observable<any>;
  @Output() filterUpdate: EventEmitter<any> = new EventEmitter<any>();
  constructor(private dialog: MatDialog, private store: Store<State>,  private _snackBar: MatSnackBar) {}

  ngOnInit() {
    this.isAdmin$ = this.store.pipe(select(getCurrentUserManagementAuthoritiesStatus));
    this.store.dispatch(new CheckMandatorySettingsExistAction());
    this.tableFields$ = this.store.pipe(
      select(getTableFieldsSettings)
    );
  }

  onFilterUpdate(selections: any) {
    this.filterUpdate.emit(selections);
  }

  openLegendDialog() {
    this.dialog.open(LegendConfigurationDialogComponent, {
      height: '400px',
    });
  }
  openFieldsSettingsDialog(tableFields) {
    const fields = [...tableFields];
    const dialogRef = this.dialog.open(FieldsSettingsDialogComponent, {
      width: '600px',
      height: '850px',
      panelClass: 'custom-dialog-container',
      data: fields,
      disableClose: true
    });
    dialogRef
    .afterClosed()
    .pipe(take(1))
    .subscribe((result) => {
      if (result === 'Saved') {
        this._snackBar.open(
          'Fields Settings configured successfully!',
          'Close',
          {
            duration: 2000,
          }
        );
      }
    });
  }
}
