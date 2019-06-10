import { generateUid } from '../helpers/generate-uid.helper';

export const defaultDataSetElements = [
  {
    id: generateUid(),
    name: 'Action Description',
    valueType: 'TEXTAREA',
    optionSetValue: false
  },
  {
    id: generateUid(),
    name: 'Action Period',
    valueType: 'RANGEPERIOD',
    optionSetValue: false
  },
  {
    id: generateUid(),
    name: 'Responsible Person',
    valueType: 'TEXT',
    optionSetValue: false
  },
  {
    id: generateUid(),
    name: 'Designation Title',
    valueType: 'TEXT',
    optionSetValue: false
  },
  {
    id: generateUid(),
    name: 'Action Status',
    valueType: 'SELECT',
    optionSetValue: false
  },
  {
    id: generateUid(),
    name: 'Review Date',
    valueType: 'PERIOD',
    optionSetValue: false
  },
  {
    id: generateUid(),
    name: 'Remarks',
    valueType: 'TEXTAREA',
    optionSetValue: false
  }
];
