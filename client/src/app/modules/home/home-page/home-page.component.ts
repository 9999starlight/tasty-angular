import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../../recipes/recipes.service';
import { RecipeResponse } from 'src/app/types/RecipeResponse';
//import { QueryRecipeComponent } from '../../recipes/query-recipe/query-recipe.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  recipes: RecipeResponse[] = [];
  count: number = 0;
  displayedRecipes: number = 6;

  constructor(private recipesService: RecipesService) { 

  }

  ngOnInit(){
    this.recipesService.getRecipes()
      .subscribe(res => {
        this.recipes = JSON.parse(JSON.stringify(res))
        console.log(this.recipes);
        //this.latestRecipes()
        //this.recipes.forEach(rec => console.log(rec))
      });

      //this.latestRecipes();
      
  }

  /* latestRecipes() {
    //return this.recipesService.getLatestRecipes().subscribe(res => console.log(res))
    const sorted = this.recipes.sort((a: any, b: any) => a.mealName - b.mealName)
    console.log(sorted)
    return sorted;
  } */



}
