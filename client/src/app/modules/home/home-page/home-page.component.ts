import { Component, OnDestroy, OnInit } from '@angular/core';
import { RecipesService } from '../../shared/sharedServices/recipes.service';
import { RecipeResponse } from 'src/app/types/RecipeResponse';
import { AuthService } from '../../auth/auth.service';
import { UIService } from '../../shared/sharedServices/ui.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SortingService } from '../../shared/sharedServices/sorting.service';
//import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit, OnDestroy {
  recipes: RecipeResponse[] = [];
  displayedRecipes: number = 6;
  highestRatedRecipes: RecipeResponse[] = [];
  latestRecipes: RecipeResponse[] = [];
  recommendedRecipes: RecipeResponse[] = [];
  errorMessage = '';
  isLoading = true;
  getSubscription: Subscription | undefined;
  querySubscription: Subscription | undefined;

  constructor(
    private recipesService: RecipesService,
    private authService: AuthService,
    private sortingService: SortingService,
    public uiService: UIService,
    private router: Router
  ) {}

  ngOnInit() {
    this.uiService.toggleSearchForm(false);
    console.log('user getter home page: ', this.authService.user);
    this.getSubscription = this.recipesService.getRecipes().subscribe(
      (res) => {
        if (res) {
          this.isLoading = false;
          this.recipes = JSON.parse(JSON.stringify(res));
          console.log(this.recipes);
          this.highestRatedRecipes = this.sortingService
            .sortRatingDescending([...this.recipes])
            .slice(0, 5);
          this.latestRecipes = this.sortingService.sortDateDescending([
            ...this.recipes,
          ]);
          this.recommendedRecipes = [...this.recipes]
            .sort(() => Math.random() - 0.5)
            .slice(0, 6);
        }
      },
      (error) => {
        this.isLoading = false;
        this.errorMessage = `Error: ${error.statusText}`;
        console.log(error.statusText);
      }
    );
  }

  onClear(msg: string) {
    this.errorMessage = msg;
  }

  loadMore() {
    if (this.displayedRecipes > this.recipes.length) {
      return;
    }
    this.displayedRecipes *= 2;
  }

  getNewResults(params: any) {
    this.querySubscription = this.recipesService
      .getRecipesByQuery(params)
      .subscribe(
        (res: any) => {
          console.log(params);
          this.router.navigate(['results'], { queryParams: params });
        },
        (error: any) => {
          console.log(error.statusText);
        }
      );
  }

  ngOnDestroy() {
    this.getSubscription?.unsubscribe();
    this.querySubscription?.unsubscribe();
  }
}
