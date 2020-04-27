import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-progress-visualization-dialog',
  templateUrl: './progress-visualization-dialog.component.html',
  styleUrls: ['./progress-visualization-dialog.component.css'],
})
export class ProgressVisualizationDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {}
}
