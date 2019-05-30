import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-text-view',
  templateUrl: './text-view.component.html',
  styleUrls: ['./text-view.component.css']
})
export class TextViewComponent implements OnInit {
  @Input() maxTextLength: number;
  @Input() text: string;
  truncatedText: string;
  constructor() {
    this.maxTextLength = 200;
  }

  ngOnInit() {
    this.truncatedText = _.truncate(this.text, {
      length: this.maxTextLength,
      seperator: ' '
    });
  }

  onToggleText(action: string) {
    if (action === 'SHOW_MORE') {
      this.maxTextLength = this.text.length;
    } else {
      this.maxTextLength = 200;
    }

    this.truncatedText = _.truncate(this.text, {
      length: this.maxTextLength,
      seperator: ' '
    });
  }
}
