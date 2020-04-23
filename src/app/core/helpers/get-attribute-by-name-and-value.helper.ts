import * as _ from 'lodash';
export function getAttributeByNameAndValue(
  programStageDataElement,
  attributeName,
  attributeValue
) {
  return _.find(
    _.get(programStageDataElement, `dataElement.attributeValues`),
    attributeItems =>
      _.get(attributeItems, 'attribute.name') == attributeName &&
      _.get(attributeItems, 'value') == attributeValue
  );
}
