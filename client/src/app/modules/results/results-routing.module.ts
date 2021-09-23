import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResultsHomeComponent } from './results-home/results-home.component';
import { ResultsResolver } from './results.resolver';


const routes: Routes = [
  {
    path: '',
    component: ResultsHomeComponent,
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
