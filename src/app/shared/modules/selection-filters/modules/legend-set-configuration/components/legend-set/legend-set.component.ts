import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LegendSet, Legend } from '../../models/legend-set';
import * as _ from 'lodash';
import { id } from 'date-fns/locale';

@Component({
  selector: 'app-legend-set',
  templateUrl: './legend-set.component.html',
  styleUrls: ['./legend-set.component.css'],
})
export class LegendSetComponent implements OnInit {
  @Input() legendSet: LegendSet;
  @Input() showDeleteIcon: boolean;

  @Output() legendSetUpdates: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  onLegendUpdates(data: Legend) {
    const legends = _.sortBy(
      _.map(this.legendSet.legends, (legend) => {
        return legend.id === data.id ? data : legend;
      }),
      'startValue'
    );

    this.legendSetUpdates.emit({ ...this.legendSet, legends });
  }

  onDeleteLegend(data) {
    const { id } = data;
    this.legendSet.legends = _.filter(this.legendSet.legends, (legend) => {
      return legend.id !== id;
    });
  }

  onSetDefaultLegend(data) {
    const { id } = data;
    const legendSet = _.cloneDeep(this.legendSet);
    // unset current default
    _.unset(_.find(legendSet.legends, 'isDefault'), 'isDefault');

    // set current default
    _.set(_.find(legendSet.legends, { id }), 'isDefault', true);
    this.legendSet = legendSet;

    this.legendSetUpdates.emit(this.legendSet);
  }
}
