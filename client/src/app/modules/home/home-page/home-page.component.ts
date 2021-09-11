import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../../shared/sharedServices/recipes.service';
import { RecipeResponse } from 'src/app/types/RecipeResponse';
import { HashScrollService } from 'src/app/modules/shared/sharedServices/hash-scroll.service';
//import { faChevronCircleUp, faStar } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  recipes: RecipeResponse[] = [];
  displayedRecipes: number = 6;
  highestRatedRecipes: RecipeResponse[] = [];
  latestRecipes: RecipeResponse[] = [];
  recommendedRecipes: RecipeResponse[] = [];

  // icons
  /* faChevronCircleUp = faChevronCircleUp;
  faStar = faStar; */
  constructor(
    private recipesService: RecipesService,
    public hashScrollService: HashScrollService
  ) {}

  ngOnInit() {
    this.recipesService.getRecipes().subscribe((res) => {
      this.recipes = JSON.parse(JSON.stringify(res));
      console.log(this.recipes);
      this.highestRatedRecipes = this.getHighestRatedRecipes();
      this.latestRecipes = this.getLatestRecipes();
      this.recommendedRecipes = this.getRecomendedRecipes();
      /*console.log(this.highestRatedRecipes)
        console.log(this.latestRecipes)
        console.log(this.recommendedRecipes) */
    });
  }

  getLatestRecipes() {
    return [...this.recipes].sort(
      (a: RecipeResponse, b: RecipeResponse) =>
        <any>new Date(b.createdAt) - <any>new Date(a.createdAt)
    );
  }

  getHighestRatedRecipes() {
    return [...this.recipes]
      .sort((a: RecipeResponse, b: RecipeResponse) => b.rating - a.rating)
      .slice(0, 5);
  }

  getRecomendedRecipes() {
    return [...this.recipes].sort(() => Math.random() - 0.5).slice(0, 6);
  }

  loadMore() {
    if (this.displayedRecipes > this.recipes.length) {
      return;
    }
    this.displayedRecipes *= 2;
  }
}
