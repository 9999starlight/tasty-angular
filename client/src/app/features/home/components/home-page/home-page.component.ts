import { AsyncPipe, SlicePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchComponent } from '../../../../shared/components/search/search.component';
import { UiService } from '../../../../shared/services/ui.service';
import { Router } from '@angular/router';
import { SearchParams } from '../../../../shared/components/models/search.model';
import { TagsComponent } from '../tags/tags.component';
import { QueryRecipeComponent } from '../../../recipes/components/query-recipe/query-recipe.component';
import { PageErrorComponent } from '../../../../shared/components/page-error/page-error.component';
import { LoaderComponent } from '../../../../shared/components/loader/loader.component';
import { RecipesFacade } from '../../../recipes/facade/recipes.facade';
import { Recipe } from '../../../recipes/models/recipe.entity';
import { SliderComponent } from '../slider/slider.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  imports: [AsyncPipe, SlicePipe, SearchComponent, TagsComponent, QueryRecipeComponent, PageErrorComponent, LoaderComponent, SliderComponent]
})
export class HomePageComponent implements OnInit {
  readonly uiService = inject(UiService);
  private recipesFacade = inject(RecipesFacade);
  private router = inject(Router);

  readonly recipesPageSize = 6;
  displayedRecipes = 6;
  readonly highestRatedRecipes$: Observable<Recipe[]> = this.recipesFacade.highestRatedRecipes$;
  readonly latestRecipes$: Observable<Recipe[]> = this.recipesFacade.latestRecipes$;
  readonly recommendedRecipes$: Observable<Recipe[]> = this.recipesFacade.recommendedRecipes$;
  readonly error$: Observable<string | null> = this.recipesFacade.error$;
  readonly isLoading$: Observable<boolean> = this.recipesFacade.loading$;

  getNewResults(params: SearchParams) {
    this.router.navigate(['recipes'], { queryParams: params });
  }

  loadMore(totalLatestRecipes: number) {
    this.displayedRecipes = Math.min(
      this.displayedRecipes + this.recipesPageSize,
      totalLatestRecipes,
    );
  }

  ngOnInit(): void {
    this.uiService.toggleSearchForm(false);
  }
}
