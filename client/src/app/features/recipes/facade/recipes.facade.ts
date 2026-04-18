import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommentPost } from '../models/comment.model';
import { RecipeSortDirection } from '../models/recipe.entity';
import { RecipesActions } from '../store/recipes.actions';
import {
  selectHighestRatedRecipes,
  selectLatestRecipes,
  selectRecommendedRecipes,
  selectRecipesError,
  selectRecipesLoading,
  selectRecipesSuccessMessage,
  selectSelectedRecipe,
  selectSortedRecipes,
  selectTotalCount,
  selectRecipesVm,
} from '../store/recipes.selectors';
import { SearchParams } from '../../../shared/components/models/search.model';

@Injectable({ providedIn: 'root' })
export class RecipesFacade {
  #store = inject(Store);

  // Selectors
  recipes$ = this.#store.select(selectSortedRecipes);
  selectedRecipe$ = this.#store.select(selectSelectedRecipe);
  loading$ = this.#store.select(selectRecipesLoading);
  error$ = this.#store.select(selectRecipesError);
  successMessage$ = this.#store.select(selectRecipesSuccessMessage);
  totalCount$ = this.#store.select(selectTotalCount);
  vm$ = this.#store.select(selectRecipesVm);
  highestRatedRecipes$ = this.#store.select(selectHighestRatedRecipes);
  latestRecipes$ = this.#store.select(selectLatestRecipes);
  recommendedRecipes$ = this.#store.select(selectRecommendedRecipes);

  // Actions
  loadRecipes$(options?: SearchParams) {
    this.#store.dispatch(RecipesActions.loadRecipes({ options }));
  }

  loadSingleRecipe$(id: string) {
    this.#store.dispatch(RecipesActions.loadSingleRecipe({ id }));
  }

  createRecipe$(recipeData: any) {
    this.#store.dispatch(RecipesActions.createRecipe({ recipeData }));
  }

  updateRecipe$(id: string, recipeData: any) {
    this.#store.dispatch(RecipesActions.updateRecipe({ id, recipeData }));
  }

  updateRating$(id: string, userRate: number) {
    this.#store.dispatch(RecipesActions.updateRating({ id, userRate }));
  }

  setSort$(field: 'title' | 'rating' | 'date', direction: RecipeSortDirection) {
    this.#store.dispatch(RecipesActions.setSort({ field, direction }));
  }

  postComment$(commentData: CommentPost) {
    this.#store.dispatch(RecipesActions.postComment({ commentData }));
  }

  clearError$(error: string | null = null) {
    this.#store.dispatch(RecipesActions.clearError({ error }));
  }

  clearSuccessMessage$() {
    this.#store.dispatch(RecipesActions.clearSuccessMessage());
  }
}
