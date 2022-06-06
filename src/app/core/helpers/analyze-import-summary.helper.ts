import * as _ from 'lodash';

export class ImportSummaryHelper {


  static analyzeImportSummary(importSummary: any) {
    const {httpStatus, response: {importSummaries}} = importSummary ?? {};
    const teiImportErrors = importSummaries?.filter((summary: any) => summary.status !== 'SUCCESS');
    const allEnrollments = _.flattenDeep(importSummaries
      .map((summary: any) => summary.enrollments));
    const allEvents = _.flattenDeep(allEnrollments.map((enrollment: any) => enrollment.importSummaries.map(summary => summary.events)));
    const enrollmentImportErrors = allEnrollments.filter((enrollment: any) => enrollment.status !== 'SUCCESS');
    const eventImportErrors = allEvents.filter((event: any) => event.status !== 'SUCCESS');

    if (_.isEmpty(teiImportErrors) && _.isEmpty(enrollmentImportErrors) && _.isEmpty(eventImportErrors)) {
      return {
        status: 'SUCCESS',
        errors: []
      };
    }

    const errors = _.flattenDeep([...teiImportErrors, ...enrollmentImportErrors, ...eventImportErrors]
      ?.map((error: any) => error?.importSummaries
        .map(summary => summary?.description))) ?? [];

    return {
      status: 'ERROR',
      errors
    };
  }

}



