import * as _ from 'lodash';
export function upsertEnrollmentPayload(enrollment, eventPayload) {
  const eventIndex = _.findIndex(enrollment.events, {
    event: eventPayload ? eventPayload.event : '',
  });

  return eventIndex !== -1
    ? {
        ...enrollment,
        events: [
          ..._.slice(enrollment.events, 0, eventIndex),
          eventPayload,
          ..._.slice(enrollment.events, eventIndex + 1),
        ],
      }
    : { ...enrollment, events: [...enrollment.events, eventPayload] };
}
