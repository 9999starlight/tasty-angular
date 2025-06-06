import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { RecipesService } from '../../shared/sharedServices/recipes.service';
import { RecipeResponse } from 'src/app/types/RecipeResponse';
import { UIService } from '../../shared/sharedServices/ui.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { SortingService } from '../../shared/sharedServices/sorting.service';
import { LoaderComponent } from '../../shared/components/loader/loader.component';
import { PageErrorComponent } from '../../shared/components/page-error/page-error.component';
import { QueryRecipeComponent } from '../../shared/components/query-recipe/query-recipe.component';
import { TagsComponent } from '../tags/tags.component';
import { SliderComponent } from '../slider/slider.component';
import { SearchComponent } from '../../shared/components/search/search.component';
import { SlicePipe } from '@angular/common';
@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
    standalone: true,
    imports: [
    SearchComponent,
    SliderComponent,
    TagsComponent,
    QueryRecipeComponent,
    PageErrorComponent,
    LoaderComponent,
    SlicePipe
],
})
export class HomePageComponent implements OnInit, OnDestroy {
  private recipesService = inject(RecipesService);
  private sortingService = inject(SortingService);
  uiService = inject(UIService);
  private router = inject(Router);

  recipes: RecipeResponse[] = [];
  displayedRecipes: number = 6;
  highestRatedRecipes: RecipeResponse[] = [];
  latestRecipes: RecipeResponse[] = [];
  recommendedRecipes: RecipeResponse[] = [];
  errorMessage = '';
  isLoading = true;
  getSubscription?: Subscription;
  querySubscription?: Subscription;

  ngOnInit() {
    this.uiService.toggleSearchForm(false);
    this.getSubscription = this.recipesService.getRecipes().subscribe(
      (res) => {
        if (res) {
          this.isLoading = false;
          this.recipes = JSON.parse(JSON.stringify(res));
          // console.log(this.recipes);
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
