import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserHomeComponent } from './user-home/user-home.component';
import { UserRecipesComponent } from './user-recipes/user-recipes.component';
import { CreateRecipeComponent } from './create-recipe/create-recipe.component';
import { SavedRecipesComponent } from './saved-recipes/saved-recipes.component';


@NgModule({
  declarations: [
    UserHomeComponent,
    UserRecipesComponent,
    CreateRecipeComponent,
    SavedRecipesComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
