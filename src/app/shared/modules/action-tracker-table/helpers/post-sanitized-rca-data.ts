import { RootCauseAnalysisData } from '../store/models/root-cause-analysis-data.model';

export function postSanitizedRcaData(
  rcaDataPayload: any
): RootCauseAnalysisData {
  rcaDataPayload.isActive = !rcaDataPayload.isActive;
  return rcaDataPayload;
}
