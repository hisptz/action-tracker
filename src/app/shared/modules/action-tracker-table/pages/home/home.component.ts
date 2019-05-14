import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { State } from "../../../../../core/store/reducers";
import { ActionTrackerWidgetState } from "../../store";
import { SetCurrentRootCauseAnalysisWidget } from "../../store/actions/root-cause-analysis-widget.actions";
import { LoadRootCauseAnalysisConfigurations } from "../../store/actions/root-cause-analysis-configuration.actions";
import { getRouterParams } from "../../../../../core/store/selectors/router.selectors";
import { Observable } from "rxjs";

@Component({
  selector: "action-tracker-table",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  routeParams = {
    dashboardItemId: "rcawidget"
  };
  configurationId = "rcaconfig";

  routerParams$: Observable<any>;
  selectedOrgUnit$: Observable<string>;
  selectedPeriod$: Observable<string>;

  constructor(
    private rootStore: Store<State>,
    private actionTrackerStore: Store<ActionTrackerWidgetState>
  ) {
    this.actionTrackerStore.dispatch(
      new LoadRootCauseAnalysisConfigurations(
        this.configurationId,
        this.routeParams.dashboardItemId
      )
    );

    this.actionTrackerStore.dispatch(
      new SetCurrentRootCauseAnalysisWidget(this.routeParams.dashboardItemId)
    );

    this.routerParams$ = rootStore.select(getRouterParams);
  }

  ngOnInit() {}
}

// ?orgUnit=Hq1ZHMHGvQE&period=2018&dashboard=poT89mkmVlL

// https://scorecard-dev.dhis2.org/demo/api/apps/bna-widget/index.html?dashboardItemId=lpkWaVLCuQ0&other=/#/?orgUnit={"id":"Hq1ZHMHGvQE","name":"Bird District","label":"Bird District"}&period={"id":"2018","name":"2018","label":"2018"}&dashboard={"id":"poT89mkmVlL","name":"Focused ANC"}&dashboardItem=lpkWaVLCuQ0&groups=[{"id":"gMBbWj0ti27","name":"Commodities","members":[{"id":"C2R035EN1zx","name":"Availability of Tetanus Toxoid"}]},{"id":"cH7F1WrsMba","name":"Human Resources","members":[{"id":"Ho2X2O2NIzk","name":"Availability of Trained FANC Providers"}]},{"id":"k1ZoaGAFVL3","name":"Geographic Accessibility","members":[{"id":"BvG8P80QxqZ","name":"Access to ANC Services"}]},{"id":"sY3S9lyvgnx","name":"Initial Utilisation","members":[{"id":"cn8c5IGTCrf","name":"Initial ANC Utilization"}]},{"id":"Zb8rG5RD91g","name":"Continuous Utilisation","members":[{"id":"DjsVrjWMW5S","name":"Continous ANC Utilization"}]},{"id":"lvOXDYaW7hB","name":"Effective Coverage","members":[{"id":"BVmO0Bd9VtS","name":"Effective Coverage/Quality FANC Visits"}]}]
