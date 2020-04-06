import { Fn } from '@iapps/function-analytics';
import { filter, find, map, omit, reverse, uniqBy, take } from 'lodash';

export function updateSelectionsWithBottleneckParams(
  dataSelections: any[],
  globalSelections: any[],
  bottleneckIndicatorIds: string[] = [],
  calendarId: string
) {
  return map(dataSelections || [], (dataSelection: any) => {
    switch (dataSelection.dimension) {
      case 'dx': {
        const effectiveCoverageIndicators = (
          (
            find(dataSelection ? dataSelection.groups || [] : [], [
              'name',
              'Effective Coverage',
            ]) || { members: [] }
          ).members || []
        ).map((effectiveCoverageIndicator: any) => ({
          ...effectiveCoverageIndicator,
          isEffectiveCoverage: true,
        }));

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
            ),
          },
          'groups'
        );
      }

      case 'pe': {
        const periodSelection =
          find(globalSelections, ['dimension', dataSelection.dimension]) ||
          dataSelection;

        const period = (periodSelection.items || [])[0];
        return {
          ...periodSelection,
          items: reverse(
            take(
              filter(
                getPeriodsBasedOnType(period.type, calendarId) || [],
                (periodItem: any) => periodItem.id <= period.id
              ),
              4
            )
          ),
          layout: 'rows',
        };
      }

      case 'ou': {
        return {
          ...(find(globalSelections, ['dimension', dataSelection.dimension]) ||
            dataSelection),
          layout: 'filters',
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

function getPeriodsBasedOnType(periodtype: string, calendarId: string) {
  const periodInstance = new Fn.Period();
  periodInstance
    .setType(periodtype)
    .setCalendar(calendarId)
    .setPreferences({
      allowFuturePeriods: true,
    })
    .get();

  const currentYear = periodInstance.currentYear();

  const periodList = periodInstance.list() || [];
  const previousPeriodList = periodInstance
    .setYear(currentYear - 1)
    .get()
    .list();

  return uniqBy([...(periodList || []), ...(previousPeriodList || [])], 'id');
}
