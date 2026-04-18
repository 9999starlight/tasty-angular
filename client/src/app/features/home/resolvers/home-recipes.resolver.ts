import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { RecipesFacade } from '../../recipes/facade/recipes.facade';

export const homeRecipesResolver: ResolveFn<boolean> = () => {
  const recipesFacade = inject(RecipesFacade);
  recipesFacade.loadRecipes$();
  return true;
};