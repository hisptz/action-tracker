import { filter, find, map, omit } from 'lodash';

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
            items: [...bottleneckIndicators, ...effectiveCoverageIndicators]
          },
          'groups'
        );
      }

      default:
        return (
          find(globalSelections, ['dimension', dataSelection.dimension]) ||
          dataSelection
        );
    }
  });
}
