import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { reducers } from "./store/reducers";
import { effects } from "./store/effects";

import { NgPipesModule } from "ngx-pipes";

import { CommonModule } from "@angular/common";

import { pages } from "./pages";
import { components } from "./components";
import { directives } from "./directives";
@NgModule({
  declarations: [...pages, ...components, ...directives],
  exports: [...pages, ...components],
  imports: [
    CommonModule,
    FormsModule,
    NgPipesModule,
    StoreModule.forFeature("actionTrackerWidget", reducers),
    EffectsModule.forFeature(effects)
  ]
})
export class ActionTrackerTableModule {}
