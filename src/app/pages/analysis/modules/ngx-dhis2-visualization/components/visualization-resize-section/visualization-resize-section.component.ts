import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RESIZE_ICON, FULL_SCREEN_ICON } from '../../icons';

@Component({
  selector: 'app-visualization-resize-section',
  templateUrl: './visualization-resize-section.component.html',
  styleUrls: ['./visualization-resize-section.component.css']
})
export class VisualizationResizeSectionComponent implements OnInit {
  @Input() id: string;
  @Input() showResizeButton: boolean;
  @Input() showFullScreenButton: boolean;
  @Input() fullScreen: boolean;

  @Output() toggleFullScreen: EventEmitter<boolean> = new EventEmitter<
    boolean
  >();
  @Output() resizeCard: EventEmitter<string> = new EventEmitter<string>();

  resizeIcon: string;
  fullScreenIcon: string;

  constructor() {
    this.resizeIcon = RESIZE_ICON;
    this.fullScreenIcon = FULL_SCREEN_ICON;
  }

  ngOnInit() {}

  onToggleFullScreen(e) {
    e.stopPropagation();
    this.toggleFullScreen.emit(!this.fullScreen);
  }

  onResizeCard(e?) {
    if (e) {
      e.stopPropagation();
    }
    this.resizeCard.emit(this.id);
  }
}
