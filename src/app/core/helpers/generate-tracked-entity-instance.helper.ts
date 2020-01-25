import * as _ from "lodash";

export function generateTEI(actionTrackerDataItem) {
  console.log(actionTrackerDataItem);
  console.log(
    JSON.stringify([
      {
        trackedEntityInstance: "EZN8hOiJ9bK",
        trackedEntityType: "Ye0YvjaDfHr",
        orgUnit: _.get(actionTrackerDataItem, "selectionParams.orgUnit"),
        attributes: _.get(actionTrackerDataItem, "attributes"),
        enrollments: [
          {
            trackedEntityInstance: "EZN8hOiJ9bK",
            program: "DWxDYudi4EB",
            status: "ACTIVE",
            orgUnit: _.get(actionTrackerDataItem, "selectionParams.orgUnit"),
            enrollmentDate: "2019-09-30",
            incidentDate: "2019-09-30",
            enrollment: "bWIaGo7dYzW",
            events: [
              {
                event: "llPotDH4oKx",
                dataValues: _.get(actionTrackerDataItem, "dataValues"),
                program: "DWxDYudi4EB",
                programStage: "ifYMYvyWv0H",
                orgUnit: _.get(
                  actionTrackerDataItem,
                  "selectionParams.orgUnit"
                ),
                trackedEntityInstance: "EZN8hOiJ9bK",
                status: "ACTIVE",
                eventDate: _.get(
                  actionTrackerDataItem,
                  "selectionParams.eventDate"
                )
              }
            ]
          }
        ]
      }
    ])
  );
}