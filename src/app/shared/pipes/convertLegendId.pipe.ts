import { Pipe, PipeTransform } from "@angular/core";
import { find, map } from "lodash";

@Pipe({
  name: "convertLegendId"
})
export class ConvertLegendIdPipe implements PipeTransform {
  transform(value: string, legendSet: any): any {
    const legend = find(legendSet ? legendSet.legends || [] : [], [
      "id",
      value
    ]);

    return legend ? legend.name || value : value;
  }
}
