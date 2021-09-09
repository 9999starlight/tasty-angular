import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeComponent } from './recipe/recipe.component';
//import { SentenceCasePipe } from 'src/app/shared/pipes/sentence-case.pipe';
/* import { TooltipComponent } from 'src/app/components/shared/tooltip/tooltip.component';
import { InfoMessageComponent } from 'src/app/components/shared/info-message/info-message.component'; */
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    RecipeComponent,
    /* TooltipComponent,
    InfoMessageComponent, */
    //SentenceCasePipe
    
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
})
export class RecipeDetailsModule { }
