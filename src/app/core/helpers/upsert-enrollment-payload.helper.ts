import * as _ from 'lodash';
export function upsertEnrollmentPayload(enrollment, eventPayload) {
  const eventIndex = _.findIndex(enrollment.events, {
    event: eventPayload.event
  });
  return eventIndex >= 0
    ? _.set(enrollment, `events[${eventIndex}]`, eventPayload)
    : enrollment.events.push(eventPayload);
}
