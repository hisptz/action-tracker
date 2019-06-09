import { filter, find, map, omit, uniqBy } from 'lodash';

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
          (item: any) => (bottleneckIndicatorIds || []).includes(item.id)
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
        return { ...dataSelection, layout: 'rows' };
      }

      case 'ou': {
        return { ...dataSelection, layout: 'filters' };
      }

      default:
        return (
          find(globalSelections, ['dimension', dataSelection.dimension]) ||
          dataSelection
        );
    }
  });
}
