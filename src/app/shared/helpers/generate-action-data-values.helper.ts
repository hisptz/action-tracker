import * as _ from 'lodash';
export function generateActionDataValue(configurationDataElements, dataItem) {
  const newDataValues = { ...dataItem.dataValues };
  configurationDataElements.forEach((configDataElement: any) => {
    if (
      configDataElement.isActionTrackerColumn &&
      configDataElement.code !== 'BNA_REF'
    ) {
      newDataValues[configDataElement.id] = '';
    }
  });

  return newDataValues;
}
