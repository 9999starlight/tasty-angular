import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ResultsRoutingModule } from './results-routing.module';
import { ResultsHomeComponent } from './results-home/results-home.component';


@NgModule({
  declarations: [
    ResultsHomeComponent
  ],
  imports: [
    CommonModule,
    ResultsRoutingModule,
    SharedModule
  ]
})
export class ResultsModule { }
