import { generateUid } from '../helpers/generate-uid.helper';

export const defaultDataSetElements = [
  {
    id: generateUid(),
    name: 'Action Description',
    valueType: 'TEXTAREA',
    optionSetValue: false,
    formControlName: 'actionDescription'
  },
  {
    id: generateUid(),
    name: 'Action Period',
    valueType: 'RANGEPERIOD',
    optionSetValue: false,
    formControlName: 'actionPeriod'
  },
  {
    id: generateUid(),
    name: 'Responsible Person',
    valueType: 'TEXT',
    optionSetValue: false,
    formControlName: 'responsiblePerson'
  },
  {
    id: generateUid(),
    name: 'Designation Title',
    valueType: 'TEXT',
    optionSetValue: false,
    formControlName: 'designationTitle'
  },
  {
    id: generateUid(),
    name: 'Action Status',
    legendSet: {
      id: 'kC0lyoKVBqC',
      name: 'Action status',
      legends: [
        {
          id: 'FZBeUBoS7WW',
          name: 'Not started',
          color: '#fff',
          status: 'Not Started'
        },
        {
          id: 'FZqewBoSrWW',
          name: 'In Progress',
          color: '#FFFC03',
          status: 'In Progress'
        },
        {
          id: 'hjBwUBoS7WW',
          name: 'Constrained',
          color: '#F7CBAC',
          status: 'Constrained'
        },
        {
          id: 'vbreUBoS7WW',
          name: 'Completed',
          color: '#70AD46',
          status: 'Completed'
        },
        {
          id: 'FZBasBoS7WW',
          name: 'Discontinued',
          color: '#F62403',
          status: 'Discontinued'
        }
      ]
    },
    valueType: 'SELECT',
    optionSetValue: false,
    formControlName: 'actionStatus'
  },
  {
    id: generateUid(),
    name: 'Review Date',
    valueType: 'PERIOD',
    optionSetValue: false,
    formControlName: 'reviewDate'
  },
  {
    id: generateUid(),
    name: 'Remarks',
    valueType: 'TEXTAREA',
    optionSetValue: false,
    formControlName: 'remarks'
  }
];
