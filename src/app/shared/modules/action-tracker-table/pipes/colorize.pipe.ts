import { Pipe, PipeTransform } from '@angular/core';
import { find } from 'lodash';

@Pipe({
  name: 'colorize'
})
export class ColorizePipe implements PipeTransform {
  transform(value: string, legendSet: any): any {
    const legend = find(legendSet ? legendSet.legends || [] : [], [
      'id',
      value
    ]);

    return legend ? legend.color || '#000' : '#000';
  }
}
