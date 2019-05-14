export function getQueryParams(dataSelections: any[]) {
  const queryParams = {};
  (dataSelections || []).forEach(dataSelection => {
    queryParams[dataSelection.dimension] = (dataSelection.items || [])
      .map(item => item.id)
      .join(';');
  });
  return queryParams;
}
