import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ResultsRoutingModule } from './results-routing.module';
import { ResultsHomeComponent } from './results-home/results-home.component';


@NgModule({
    imports: [
        CommonModule,
        ResultsRoutingModule,
        SharedModule,
        ResultsHomeComponent
    ]
})
export class ResultsModule { }
