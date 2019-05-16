import * as helper from "../helpers/";

export const params = {
  orgUnitName: "Kigumbe",
  orgUnitId: "uh3q8r4qhjr",
  periodName: "July - September 2018",
  periodId: "2018Q3",
  interventionName: "ANC",
  interventionId: "jm2sad5jfop",
  bottleneckName: "",
  bottleneckId: "",
  indicatorName: "",
  indicatorId: ""
};

export const rowDetails = {
  id: helper.generateUid(),
  configurationId: "rcaconfig",
  isActive: true
};

export const rowValues = {
  orgUnitName: params.orgUnitName,
  orgUnitId: params.orgUnitId,
  periodName: params.periodName,
  periodId: params.periodId,
  interventionName: params.interventionName,
  interventionId: params.indicatorId,
  bottleneckName: "",
  bottleneckId: "",
  indicatorName: "",
  indicatorId: "",
  rootCause: "",
  solution: ""
};
