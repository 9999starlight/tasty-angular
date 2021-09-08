import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeComponent } from './recipe/recipe.component';
import { QueryRecipeComponent } from './query-recipe/query-recipe.component';
import { SharedModule } from 'src/app/shared/shared.module';
@NgModule({
  declarations: [
    RecipeComponent,
    QueryRecipeComponent,
    SharedModule
  ],
  imports: [
    CommonModule
  ]
})
export class RecipesModule { }
