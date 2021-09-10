import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeComponent } from './recipe/recipe.component';
import { RecipeDetailsRoutingModule } from './recipe-details-routing.module';
//import { SentenceCasePipe } from 'src/app/shared/pipes/sentence-case.pipe';
/* import { TooltipComponent } from 'src/app/components/shared/tooltip/tooltip.component';
import { InfoMessageComponent } from 'src/app/components/shared/info-message/info-message.component'; */
import { SharedModule } from 'src/app/shared/shared.module';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faPlus, faStar, faWeight, faClock, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';


@NgModule({
  declarations: [
    RecipeComponent,
    /* TooltipComponent,
    InfoMessageComponent, */
    // SentenceCasePipe
    
  ],
  imports: [
    CommonModule,
    RecipeDetailsRoutingModule,
    SharedModule,
    FontAwesomeModule
  ],
})
export class RecipeDetailsModule { 
  constructor(library: FaIconLibrary){
    library.addIcons(faPlus, faStar, faWeight, faClock, faCheck, faTimes);
  }
 }
