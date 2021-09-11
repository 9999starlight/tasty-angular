import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeComponent } from './recipe/recipe.component';
import { RecipeDetailsRoutingModule } from './recipe-details-routing.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faPlus, faStar, faWeight, faClock, faCheck, faTimes, faUsers } from '@fortawesome/free-solid-svg-icons';


@NgModule({
  declarations: [
    RecipeComponent
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
    library.addIcons(faPlus, faStar, faWeight, faClock, faCheck, faTimes, faUsers);
  }
 }
