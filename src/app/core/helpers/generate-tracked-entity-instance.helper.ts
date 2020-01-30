import * as _ from 'lodash';
import { generateUid } from './generate-uid.helper';
import { getFormattedDate } from './generate-formatted-date.helper';
import {
  programId,
  trackedEntityType,
  programStage
} from '../constants/program-items.constant';
export function generateTEI(actionTrackerDataItem) {
  const trackedEntityInstance = generateUid();
  return {
    rootCauseDataId: _.get(
      actionTrackerDataItem,
      'selectionParams.rootCauseDataId'
    ),
    trackedEntityInstance: actionTrackerDataItem.id || trackedEntityInstance, // if not there autogen
    trackedEntityType: trackedEntityType,
    orgUnit: _.get(actionTrackerDataItem, 'selectionParams.orgUnit'),
    attributes: _.get(actionTrackerDataItem, 'attributes')
  };
}
