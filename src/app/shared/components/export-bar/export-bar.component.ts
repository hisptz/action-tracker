import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-export-bar',
  templateUrl: './export-bar.component.html',
  styleUrls: ['./export-bar.component.css']
})
export class ExportBarComponent implements OnInit {
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
