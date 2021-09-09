import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QueryRecipeComponent } from './query-recipe/query-recipe.component';
import { SharedModule } from 'src/app/shared/shared.module';
@NgModule({
  declarations: [
    QueryRecipeComponent,

  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class RecipesModule { }
