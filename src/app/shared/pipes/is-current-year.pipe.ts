import { Pipe, PipeTransform } from '@angular/core';
import { getYear } from 'date-fns';

@Pipe({
  name: 'isCurrentYear'
})
export class IsCurrentYearPipe implements PipeTransform {
  transform(yearOfCurrentPeriodSelection: number): any {
    return yearOfCurrentPeriodSelection == getYear(new Date()) ? true : false;
  }
}
