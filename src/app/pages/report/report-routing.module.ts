import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportComponent } from './containers/report/report.component';

const routes: Routes = [
  {
    path: '',
    component: ReportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule {}
