import { Pipe, PipeTransform } from '@angular/core';
import { find } from 'lodash';

@Pipe({
  name: 'textTruncate'
})
export class TextTruncatePipe implements PipeTransform {
  transform(value: string, length: number, truncationStatus): string {
    console.log(value, length, truncationStatus);
    if (value) {
      const biggestWord = 50;
      const elipses = '...';
      value = value ? value.toString() : value;

      if (typeof value === 'undefined') return value;
      if (value.length <= length || truncationStatus) return value;
      //.. truncate to about correct lenght
      let truncatedText = value.slice(0, length + biggestWord);

      //.. now nibble ends till correct length
      while (truncatedText.length > length - elipses.length) {
        let lastSpace = truncatedText.lastIndexOf(' ');
        if (lastSpace === -1) break;
        truncatedText = truncatedText
          .slice(0, lastSpace)
          .replace(/[!,.?;:]$/, '');
      }

      return truncatedText + elipses;
    }

    return value;
  }
}
