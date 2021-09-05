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
    loadChildren: () =>
      import('./pages/data-entry/data-entry.module').then(
        m => m.DataEntryModule
      )
  },
  {
    path: 'report',
    loadChildren: () =>
      import('./pages/report/report.module').then(m => m.ReportModule)
  },
  {
    path: 'analysis',
    loadChildren: () =>
      import('./pages/analysis/analysis.module').then(m => m.AnalysisModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
    useHash: true,
    preloadingStrategy: PreloadAllModules,
    relativeLinkResolution: 'legacy'
})
  ],
  exports: [RouterModule]
})
export class RoutingModule {}
