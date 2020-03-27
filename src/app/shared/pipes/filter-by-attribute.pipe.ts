import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByAttribute'
})
export class FilterByAttributePipe implements PipeTransform {
  transform(list: any, attributeName: string, attributeValue: string): any {
    if (!attributeName || !attributeValue) {
      return list;
    }

    return (list || []).filter(
      (item: any) => item[attributeName] === attributeValue
    );
  }
}
