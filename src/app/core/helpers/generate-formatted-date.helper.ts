export function getFormattedDate(date?) {
  const dateObject = date ? new Date(date) : new Date();
  const day = dateObject.getDate();
  const month = dateObject.getMonth() + 1;
  const year = dateObject.getFullYear();
  return (
    year +
    (month > 9 ? `-${month}` : `-0${month}`) +
    (day > 9 ? `-${day}` : `-0${day}`)
  );
}
