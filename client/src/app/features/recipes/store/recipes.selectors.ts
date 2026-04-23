import { createSelector } from '@ngrx/store';
import {
  pickRandomItems,
  sortDateDescending,
  sortRatingDescending,
  sortRecipes,
} from '../../../shared/utils/sorting.utils';
import { recipesAdapter, recipesFeature } from './recipes.reducer';

export const selectRecipesState = recipesFeature.selectRecipesState;

const adapterSelectors = recipesAdapter.getSelectors();

export const selectRecipesEntities = createSelector(
  selectRecipesState,
  adapterSelectors.selectEntities,
);
export const selectRecipesIds = createSelector(
  selectRecipesState,
  adapterSelectors.selectIds,
);
export const selectAllRecipes = createSelector(
  selectRecipesState,
  adapterSelectors.selectAll,
);
export const selectSelectedRecipe = recipesFeature.selectSelectedRecipe;
export const selectRecipesLoading = recipesFeature.selectLoading;
export const selectRecipesError = recipesFeature.selectError;
export const selectRecipesSuccessMessage = recipesFeature.selectSuccessMessage;
export const selectTotalCount = recipesFeature.selectTotalCount;
export const selectRecipesSortConfig = recipesFeature.selectSortConfig;

export const selectRecipeById = (id: string) =>
  createSelector(selectRecipesEntities, (entities) => entities?.[id] || null);

export const selectRecipesAsList = createSelector(
  selectAllRecipes,
  (recipes) => recipes,
);

export const selectSortedRecipes = createSelector(
  selectRecipesAsList,
  selectRecipesSortConfig,
  (recipes, sortConfig) =>
    sortRecipes(recipes, sortConfig.field, sortConfig.direction),
);

export const selectHighestRatedRecipes = createSelector(
  selectRecipesAsList,
  (recipes) => sortRatingDescending(recipes).slice(0, 5),
);

export const selectLatestRecipes = (limit?: number) =>
  createSelector(selectRecipesAsList, (recipes) => {
    const latestRecipes = sortDateDescending(recipes);
    return typeof limit === 'number' ? latestRecipes.slice(0, limit) : latestRecipes;
  });

export const selectMostCommentedRecipes = (limit?: number) =>
  createSelector(selectRecipesAsList, (recipes) => {
    const mostCommentedRecipes = [...recipes].sort((a, b) => b.comments.length - a.comments.length);
    return typeof limit === 'number'
      ? mostCommentedRecipes.slice(0, limit)
      : mostCommentedRecipes;
  });

export const selectMostCommentedRecipeStats = (limit?: number) =>
  createSelector(selectMostCommentedRecipes(limit), (recipes) =>
    recipes.map((recipe) => ({
      name: recipe.mealName,
      value: recipe.comments.length,
    })),
  );

export const selectRecommendedRecipes = createSelector(
  selectRecipesAsList,
  (recipes) => pickRandomItems(recipes, 6),
);

export const selectRecipesVm = createSelector(
  selectSortedRecipes,
  selectSelectedRecipe,
  selectRecipesLoading,
  selectRecipesError,
  selectRecipesSuccessMessage,
  selectTotalCount,
  (recipes, selectedRecipe, loading, error, successMessage, totalCount) => ({
    recipes,
    selectedRecipe,
    loading,
    error,
    successMessage,
    totalCount,
  }),
);
