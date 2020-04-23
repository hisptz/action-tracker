import { Pipe, PipeTransform } from '@angular/core';
import { find } from 'lodash';

@Pipe({
  name: 'colorize',
})
export class ColorizePipe implements PipeTransform {
  transform(value: string, legendSet: any, fallbackColor: string): any {
    const legend = find(legendSet ? legendSet.legends || [] : [], [
      'id',
      value,
    ]);
    return legend ? legend.color || fallbackColor : fallbackColor;
  }
}
