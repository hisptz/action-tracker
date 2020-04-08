import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationSnackbarComponent } from 'src/app/shared/components/notification-snackbar/notification-snackbar.component';

@Component({
  selector: 'app-legend-configuration-dialog',
  templateUrl: './legend-configuration-dialog.component.html',
  styleUrls: ['./legend-configuration-dialog.component.css'],
})
export class LegendConfigurationDialogComponent implements OnInit {
  @Output()
  legendSetConfigurationClose = new EventEmitter();
  constructor(
    public dialogRef: MatDialogRef<LegendConfigurationDialogComponent>,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {}
  onFilterClose(event) {
    this.dialogRef.close('Close');
  }

  onFilterUpdate(event) {
    this.dialogRef.close('Close');
    this._snackBar.openFromComponent(NotificationSnackbarComponent, {
      duration: 5 * 1000,
      verticalPosition: 'top',
      data: 'Legend set Updated',
    });
  }
}
