import { Pipe, PipeTransform } from '@angular/core';
import { find } from 'lodash';

@Pipe({
  name: 'isCurrentYear'
})
export class IsCurrentYearPipe implements PipeTransform {
  transform(value: string): any {
    console.log(value);
  }
}
