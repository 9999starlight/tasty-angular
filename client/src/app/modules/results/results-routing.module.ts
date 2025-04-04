import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ResultsResolver } from './results.resolver';


const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./results-home/results-home.component').then(m => m.ResultsHomeComponent),
    resolve: {
      recipes: ResultsResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResultsRoutingModule { }
