import { Fn } from '@iapps/function-analytics';
export function getPreviousPeriod(
  periodType: string,
  currentPeriod: string,
  calendar: string
) {
  const periodInstance = new Fn.Period();

  periodInstance.setType('Yearly').get();
  const currentYear = periodInstance.currentYear();

  let periodYear = parseInt((currentPeriod || '').slice(0, 4), 10);
  if (currentPeriod.indexOf('THIS_') !== -1) {
    periodYear = currentYear;
  } else if (currentPeriod.indexOf('LAST_') !== -1) {
    periodYear = currentYear - 1;
  }

  periodInstance
    .setType(periodType)
    .setCalendar(calendar)
    .setYear(periodYear)
    .setPreferences({
      allowFuturePeriods: true
    })
    .get();

  const previousPeriod = (periodInstance.list() || [])[1];
  return previousPeriod ? previousPeriod.id : '';
}
