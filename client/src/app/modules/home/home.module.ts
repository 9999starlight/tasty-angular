import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { QueryRecipeComponent } from '../recipes/query-recipe/query-recipe.component';
@NgModule({
  declarations: [
    HomePageComponent,
    QueryRecipeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
