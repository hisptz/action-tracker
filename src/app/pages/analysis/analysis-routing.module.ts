import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnalysisComponent } from './containers/analysis/analysis.component';

const routes: Routes = [
  {
    path: '',
    component: AnalysisComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnalysisRoutingModule {}
