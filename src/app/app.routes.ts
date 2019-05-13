import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'data-entry',
    pathMatch: 'full'
  },
  {
    path: 'data-entry',
    loadChildren: './pages/data-entry/data-entry.module#DataEntryModule'
  },
  {
    path: 'report',
    loadChildren: './pages/report/report.module#ReportModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class RoutingModule {}
