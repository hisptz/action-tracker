import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DataEntryRoutingModule } from "./data-entry-routing.module";
import { dataEntryComponents } from "./components";

@NgModule({
  declarations: [...dataEntryComponents],
  exports: [...dataEntryComponents],
  imports: [CommonModule, DataEntryRoutingModule]
})
export class DataEntryModule {}
