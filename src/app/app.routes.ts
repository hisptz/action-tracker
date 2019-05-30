import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DataEntryComponent } from './pages/data-entry/data-entry.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'data-entry',
    pathMatch: 'full'
  },
  {
    path: 'data-entry',
    component: DataEntryComponent
  },
  {
    path: 'report',
    loadChildren: () => import('./pages/report/report.module').then(m => m.ReportModule)
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
