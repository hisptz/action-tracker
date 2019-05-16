import * as _ from 'lodash';
export function getDataParams(dataSelections: any[], actionTrackerConfig: any) {
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
              period: peItem.id,
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
