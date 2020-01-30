import * as _ from 'lodash';
import { getPreviousPeriod } from './get-previous-period.helper';
export function getDataParams(
  dataSelections: any[],
  actionTrackerConfig: any,
  calendar: string
) {
  const intervention = _.find(dataSelections, ['dimension', 'intervention']);
  const period = _.find(dataSelections, ['dimension', 'pe']);
  const orgUnit = _.find(dataSelections, ['dimension', 'ou']);

  return _.flatten(
    _.flatten(
      (intervention ? intervention.items : []).map(intItem => {
        return (period ? period.items : []).map(peItem => {
          return (orgUnit ? orgUnit.items : []).map(ouItem => {
            return {
              intervention: intItem.id,
              bottleneckPeriodType: intItem.bottleneckPeriodType,
              period: getPreviousPeriod(
                intItem.bottleneckPeriodType,
                peItem.id,
                calendar
              ),
              orgUnit: ouItem.id,
              actionTrackerConfig: actionTrackerConfig.id,
              rootCauseConfig: actionTrackerConfig.rootCauseConfigurationId
            };
          });
        });
      })
    )
  );
}
