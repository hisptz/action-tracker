import * as _ from 'lodash';

export function generateTEI(actionTrackerDataItem) {
  const programId = 'ROSaojkGieB';
  const trackedEntityType = 'WQLx9VNVeZU';

  return {
    trackedEntityInstance: actionTrackerDataItem.id, // if not there autogen
    trackedEntityType: trackedEntityType,
    orgUnit: _.get(actionTrackerDataItem, 'selectionParams.orgUnit'),
    attributes: _.get(actionTrackerDataItem, 'attributes'),
    enrollments: actionTrackerDataItem.enrollments || [
      {
        trackedEntityInstance: actionTrackerDataItem.id, // if not there autogen
        program: programId,
        status: 'ACTIVE',
        orgUnit: _.get(actionTrackerDataItem, 'selectionParams.orgUnit'),
        enrollmentDate: '2019-09-30',
        incidentDate: '2019-09-30',
        enrollment: 'bWIaGo7dYzW', // autogenerated
        events: [
          {
            event: 'llPotDH4oKx', // autogenerated
            dataValues: _.get(actionTrackerDataItem, 'dataValues'),
            program: 'DWxDYudi4EB', //const
            programStage: 'ifYMYvyWv0H', //const
            orgUnit: _.get(actionTrackerDataItem, 'selectionParams.orgUnit'),
            trackedEntityInstance: actionTrackerDataItem.id,
            status: 'ACTIVE',
            eventDate: _.get(actionTrackerDataItem, 'selectionParams.eventDate')
          }
        ]
      }
    ]
  };
}
