import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-report-download',
  templateUrl: './report-download.component.html',
  styleUrls: ['./report-download.component.css']
})
export class ReportDownloadComponent implements OnInit {
  @Output() downloadType: EventEmitter<string> = new EventEmitter<string>();

  showDownloadTypes: boolean = false;
  constructor() {}

  ngOnInit() {}

  onSelectDownloadType(downloadType) {
    this.downloadType.emit(downloadType);
  }

  onToggleDownloadTypesVisibility() {
    this.showDownloadTypes = !this.showDownloadTypes;
  }
}
