import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserHomeComponent } from './user-home/user-home.component';
import { UserRecipesComponent } from './user-recipes/user-recipes.component';
import { CreateRecipeComponent } from './create-recipe/create-recipe.component';
import { SavedRecipesComponent } from './saved-recipes/saved-recipes.component';
import { SharedModule } from '../shared/shared.module';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
@NgModule({
  declarations: [
    UserHomeComponent,
    UserRecipesComponent,
    CreateRecipeComponent,
    SavedRecipesComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    FontAwesomeModule
  ]
})
export class UserModule { 
  constructor(library: FaIconLibrary){
    library.addIcons(faTimes);
  }
}
