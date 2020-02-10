import { Pipe, PipeTransform } from '@angular/core';
import { find } from 'lodash';

@Pipe({
  name: 'textTruncate'
})
export class TextTruncatePipe implements PipeTransform {
  transform(value: string): any {
    if (value) {
      return value.length;
    }
    return value;
  }
}
