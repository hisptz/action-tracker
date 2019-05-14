import { Component } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Title } from "@angular/platform-browser";
import { Store } from "@ngrx/store";
import { State } from "./core/store/reducers";
import { getRouterParams } from "./core/store/selectors";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  constructor(
    private store: Store<State>,
    private translate: TranslateService,
    private titleService: Title
  ) {
    this.store.select(getRouterParams).subscribe();
    // this language will be used as a fallback when a translation isn't found in the current language
    this.translate.setDefaultLang("en");

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    this.translate.use("en");

    // Set application title
    this.setTitle("Seed application");
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }
}
