import { filter, find, map, omit, uniqBy, take, reverse } from 'lodash';
import { getPeriodsBasedOnType } from '@iapps/ngx-dhis2-period-filter';

export function updateSelectionsWithBottleneckParams(
  dataSelections: any[],
  globalSelections: any[],
  bottleneckIndicatorIds: string[] = []
) {
  return map(dataSelections || [], (dataSelection: any) => {
    switch (dataSelection.dimension) {
      case 'dx': {
        const effectiveCoverageIndicators = (
          find(dataSelection ? dataSelection.groups || [] : [], [
            'name',
            'Effective Coverage'
          ]) || { members: [] }
        ).members;

        const bottleneckIndicators = filter(
          dataSelection ? dataSelection.items || [] : [],
          (item: any) =>
            (bottleneckIndicatorIds || []).includes(item.id) &&
            !find(effectiveCoverageIndicators || [], ['id', item.id])
        );

        return omit(
          {
            ...dataSelection,
            layout: 'columns',
            items: uniqBy(
              [...bottleneckIndicators, ...effectiveCoverageIndicators],
              'id'
            )
          },
          'groups'
        );
      }

      case 'pe': {
        const periodSelection =
          find(globalSelections, ['dimension', dataSelection.dimension]) ||
          dataSelection;

        const period = (periodSelection.items || [])[0];
        const date = new Date();
        const currentYear = date.getFullYear();

        return {
          ...periodSelection,
          items: reverse(
            filter(
              getPeriodsBasedOnType(period.type, currentYear) || [],
              (periodItem: any) => periodItem.id >= period.id
            )
          ),
          layout: 'rows'
        };
      }

      case 'ou': {
        return {
          ...(find(globalSelections, ['dimension', dataSelection.dimension]) ||
            dataSelection),
          layout: 'filters'
        };
      }

      default:
        return (
          find(globalSelections, ['dimension', dataSelection.dimension]) ||
          dataSelection
        );
    }
  });
}
