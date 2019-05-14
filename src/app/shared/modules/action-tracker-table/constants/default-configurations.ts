import * as helper from "../helpers/";

export const defaultDataSetElementDetails = [
  {
    name: "OrgUnit",
    id: helper.generateUid(),
    valueType: "AUTO_FILLED",
    optionSetValue: false,
    categoryCombo: {
      id: helper.generateUid(),
      name: "default",
      categoryOptionCombos: [
        {
          id: helper.generateUid(),
          name: " default"
        }
      ]
    }
  },
  {
    name: "Period",
    id: helper.generateUid(),
    valueType: "AUTO_FILLED",
    optionSetValue: false,
    categoryCombo: {
      id: helper.generateUid(),
      name: "default",
      categoryOptionCombos: [
        {
          id: helper.generateUid(),
          name: " default"
        }
      ]
    }
  },
  {
    name: "Intervention",
    id: helper.generateUid(),
    valueType: "AUTO_FILLED",
    optionSetValue: false,
    categoryCombo: {
      id: helper.generateUid(),
      name: "default",
      categoryOptionCombos: [
        {
          id: helper.generateUid(),
          name: " default"
        }
      ]
    }
  },
  {
    name: "Bottleneck",
    id: helper.generateUid(),
    valueType: "TEXT",
    optionSetValue: false,
    categoryCombo: {
      id: helper.generateUid(),
      name: "default",
      categoryOptionCombos: [
        {
          id: helper.generateUid(),
          name: " default"
        }
      ]
    }
  },
  {
    name: "Indicator",
    id: helper.generateUid(),
    valueType: "TEXT",
    optionSetValue: false,
    categoryCombo: {
      id: helper.generateUid(),
      name: "default",
      categoryOptionCombos: [
        {
          id: helper.generateUid(),
          name: " default"
        }
      ]
    }
  },
  {
    name: "Root cause",
    id: helper.generateUid(),
    valueType: "TEXT",
    optionSetValue: false,
    categoryCombo: {
      id: helper.generateUid(),
      name: "default",
      categoryOptionCombos: [
        {
          id: helper.generateUid(),
          name: " default"
        }
      ]
    }
  },
  {
    name: "Solution",
    id: helper.generateUid(),
    valueType: "TEXT",
    optionSetValue: false,
    categoryCombo: {
      id: helper.generateUid(),
      name: "default",
      categoryOptionCombos: [
        {
          id: helper.generateUid(),
          name: " default"
        }
      ]
    }
  }
];
