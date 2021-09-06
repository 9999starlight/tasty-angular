import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeComponent } from './recipe/recipe.component';
import { QueryRecipeComponent } from './query-recipe/query-recipe.component';



@NgModule({
  declarations: [
    RecipeComponent,
    QueryRecipeComponent
  ],
  imports: [
    CommonModule
  ]
})
export class RecipesModule { }
