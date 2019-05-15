import { Component, OnInit } from "@angular/core";

@Component({
  selector: "action-tracker-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.css"]
})
export class FormComponent implements OnInit {
  actionTrackerConfiguration: any = {
    id: "actiontrackerconfig",
    dataElements: [
      {
        id: "fnwIiq3TNki",
        name: "Action Description",
        valueType: "TEXTAREA",
        optionSetValue: false
      },
      {
        id: "UlTqe4EWEgi",
        name: "Action Period",
        valueType: "PERIOD",
        optionSetValue: false
      },
      {
        id: "MjHAVwKni19",
        name: "Responsible Person",
        valueType: "TEXT",
        optionSetValue: false
      },
      {
        id: "P4xS2frCGfv",
        name: "Designation Title",
        valueType: "TEXT",
        optionSetValue: false
      },
      {
        id: "MF6npXkFfgu",
        name: "Action Status",
        valueType: "PERIOD",
        optionSetValue: false
      },
      {
        id: "wksQFZVn3bn",
        name: "Review Date",
        valueType: "TEXT",
        optionSetValue: false
      },
      {
        id: "EPl9QPSKbkH",
        name: "Remarks",
        valueType: "TEXTAREA",
        optionSetValue: false
      }
    ],
    rootCauseConfigurationId: "rcaconfig"
  };
  actionTrackerData: any = [
    {
      id: "SlqG9G00HJD",
      dataValues: {
        fnwIiq3TNki: "Look at me describing my action",
        UlTqe4EWEgi: "I will do it in two months",
        MjHAVwKni19: "Mr. Rwechungura Mutabuzi",
        P4xS2frCGfv: "DMO",
        MF6npXkFfgu: "In Progress",
        wksQFZVn3bn: "21-01-1998",
        EPl9QPSKbkH: "Here are my remarks"
      },
      configurationId: "rcaconfig"
    }
  ];

  constructor() {}

  ngOnInit() {}
}
