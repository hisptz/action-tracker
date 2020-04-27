import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Legend } from '../../models/legend-set';
import {
  DELETE_ICON,
  GREATER_THAN_ICON,
  LESS_THAN_ICON,
  SET_DEFAULT_ICON,
  UNSET_DEFAULT_ICON,
} from '../../icons';
import { getSanitizedLegendSet } from '../../helpers/get-sanitized-legend-set.helper';

@Component({
  selector: 'app-legend-configuration',
  templateUrl: './legend-configuration.component.html',
  styleUrls: ['./legend-configuration.component.css'],
})
export class LegendConfigurationComponent implements OnInit {
  @Input()
  legend: Legend;
  @Input()
  showDeleteIcon: boolean;

  color: string;
  name: string;
  startValue: number;
  endValue: number;
  isDefault: boolean;

  deleteIcon: string;
  setDefaultIcon: string;
  unsetDefaultIcon: string;
  lessThanIcon: string;
  greaterThanIcon: string;

  @Output()
  legendUpdates = new EventEmitter();

  @Output()
  deleteLegend = new EventEmitter();

  constructor() {
    this.deleteIcon = DELETE_ICON;
    this.lessThanIcon = LESS_THAN_ICON;
    this.greaterThanIcon = GREATER_THAN_ICON;
    this.setDefaultIcon = SET_DEFAULT_ICON;
    this.unsetDefaultIcon = UNSET_DEFAULT_ICON;
  }

  onColorSelect(color: string) {
    this.color = color;
    this.onLegendUpdate();
  }

  setNegativeInfinity(e) {
    e.stopPropagation();
    this.startValue = -1.7976931348623157e10308;
    setTimeout(() => {
      this.onLegendUpdate();
    }, 50);
  }

  setPositiveInfinity(e) {
    e.stopPropagation();
    this.endValue = 1.7976931348623157e10308;
    this.onLegendUpdate();
  }

  onLegendUpdate(e?) {
    if (e) {
      e.stopPropagation();
    }
    const { id } = this.legend;
    const color = this.color;
    const name = this.name;

    this.legendUpdates.emit(
      getSanitizedLegendSet({
        id,
        color,
        name,
        startValue: this.startValue,
        endValue: this.endValue,
      })
    );
  }

  onDeleteLegend(e) {
    e.stopPropagation();
    const { id } = this.legend;
    this.deleteLegend.emit({ id });
  }

  ngOnInit() {
    if (this.legend) {
      const { color } = this.legend;
      const { name } = this.legend;
      const { startValue } = this.legend;
      const { endValue } = this.legend;
      const { isDefault } = this.legend;

      this.color = color;
      this.name = name;
      this.endValue = endValue;
      this.startValue = startValue;
      this.isDefault = isDefault;
    }
  }
}
