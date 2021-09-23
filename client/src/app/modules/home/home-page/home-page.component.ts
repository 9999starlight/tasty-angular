import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../../shared/sharedServices/recipes.service';
import { RecipeResponse } from 'src/app/types/RecipeResponse';
import { AuthService } from '../../auth/auth.service';
import { UIService } from '../../shared/sharedServices/ui.service';
import { Router } from '@angular/router';
//import { BehaviorSubject } from 'rxjs';
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
  errorMessage = '';
  isLoading = true;

  constructor(
    private recipesService: RecipesService, private authService: AuthService, public uiService: UIService, private router: Router) {
    }

  ngOnInit() {
    this.uiService.toggleSearchForm(false);
    console.log('user getter home page: ', this.authService.user)
    this.recipesService.getRecipes().subscribe((res) => {
      if(res) {
        this.isLoading = false;
        this.recipes = JSON.parse(JSON.stringify(res));
        console.log(this.recipes);
        this.highestRatedRecipes = this.getHighestRatedRecipes();
        this.latestRecipes = this.getLatestRecipes();
        this.recommendedRecipes = this.getRecomendedRecipes(); 
      }
      
    }, error => {
      this.isLoading = false;
      this.errorMessage = `Error: ${error.statusText}`;
      console.log(error.statusText);
    });
  }

  onClear(msg: string) {
    this.errorMessage = msg;
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

  getNewResults(params: any){
    this.recipesService.getRecipesByQuery(params).subscribe((res: any) => {
      console.log(params)
      this.router.navigate(['results'], { queryParams: params });
    }, (error: any) => {  
      console.log(error.statusText);
    });
  }
}
