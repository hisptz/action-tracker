export interface RootCauseAnalysisConfiguration {
  name: string;
  id: string;
  dataElements: RootCauseAnalysisConfigurationDataElement[];
}

export interface RootCauseAnalysisConfigurationDataElement {
  name: string;
  id: string;
  valueType: string;
  isHidden?: boolean;
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
}
