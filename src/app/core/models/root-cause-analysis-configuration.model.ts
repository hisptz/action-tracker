export interface RootCauseAnalysisConfiguration {
  name: string;
  id: string;
  dataElements: Array<{
    name: string;
    id: string;
    valueType: string;
    optionSetValue: boolean;
    optionSet?: {
      option: Array<{
        id: string;
        name: string;
        code: number;
      }>;
    };
    categoryCombo: {
      id: string;
      name: string;
      categoryOptionCombos: Array<{
        id: string;
        name: string;
      }>;
    };
  }>;
}
1;
