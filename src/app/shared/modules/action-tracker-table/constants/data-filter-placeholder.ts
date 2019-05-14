export const dashBoardDetails = [
  {
    id: 'e6CLNpYQBeG',
    name: 'Adolescence',
    globalSelections: [
      {
        items: [
          {
            id: 'PrVGbIUGPUv',
            name: '% ANC clients already HIV+ and on ART before pregnancy',
            type: 'INDICATOR'
          },
          {
            id: 'aeFTyGPrJOA',
            name: '% ANC clients newly tested HIV positive started on ART',
            type: 'INDICATOR'
          },
          {
            id: 'rN9JO0XfrqO',
            name: '% ANC clients tested for HIV',
            type: 'INDICATOR'
          },
          {
            id: 'TVbAl90q4tl',
            name: '% Died (new smear-positive TB cases)',
            type: 'INDICATOR'
          }
        ],
        groups: [
          {
            name: 'Effective Coverage',
            id: 'lvOXDYaW7hB',
            members: [
              {
                id: 'PrVGbIUGPUv',
                name: '% ANC clients already HIV+ and on ART before pregnancy',
                type: 'INDICATOR'
              },
              {
                id: 'aeFTyGPrJOA',
                name: '% ANC clients newly tested HIV positive started on ART',
                type: 'INDICATOR'
              }
            ],
            color: '#D98CCC'
          },
          {
            name: 'Human Resources',
            id: 'cH7F1WrsMba',
            members: [
              {
                id: 'rN9JO0XfrqO',
                name: '% ANC clients tested for HIV',
                type: 'INDICATOR'
              },
              {
                id: 'TVbAl90q4tl',
                name: '% Died (new smear-positive TB cases)',
                type: 'INDICATOR'
              }
            ],
            color: '#80CC33'
          },
          {
            name: 'Initial Utilisation',
            id: 'sY3S9lyvgnx',
            members: [],
            color: '#75F0F0'
          },
          {
            name: 'Commodities',
            id: 'gMBbWj0ti27',
            members: [],
            color: '#7DB2E8'
          },
          {
            name: 'Geographic Accessibility',
            id: 'k1ZoaGAFVL3',
            members: [],
            color: '#40BF80'
          },
          {
            name: 'Continuous Utilisation',
            id: 'Zb8rG5RD91g',
            members: [],
            color: '#9485E0'
          }
        ]
      },
      {
        dimension: 'pe',
        layout: 'filters',
        items: [
          {
            id: 'LAST_12_MONTHS'
          }
        ]
      },
      {
        dimension: 'ou',
        layout: 'columns',
        items: [
          {
            id: 'GD7TowwI46c',
            name: 'Trainingland',
            type: 'ORGANISATION_UNIT'
          }
        ]
      }
    ],
    dashboardItems: [
      {
        shape: 'FULL_WIDTH',
        type: 'CHART',
        id: 'NmteLwzWCRT',
        chart: {
          id: 'RiFmRJqbQxZ'
        }
      },
      {
        shape: 'FULL_WIDTH',
        type: 'REPORT_TABLE',
        id: 'kZU5gaRMuQ5',
        reportTable: {
          id: 'tQgOSJ3x93M'
        }
      },
      {
        shape: 'FULL_WIDTH',
        type: 'APP',
        id: 'TQ56Osp9Fsq'
      }
    ],
    creating: false,
    updatedOrCreated: true
  }
];
