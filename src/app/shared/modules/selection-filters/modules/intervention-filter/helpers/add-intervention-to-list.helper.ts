import { uniqBy } from 'lodash';
export function addInterventionToList(
  interventionList: any[],
  intervention: any
) {
  if (!intervention) {
    return interventionList;
  }
  return (interventionList || []).some(
    (interventionItem: any) => interventionItem.type === intervention.type
  )
    ? uniqBy(
        [...interventionList, intervention].sort((a, b) => b.id - a.id),
        'id'
      )
    : interventionList;
}
