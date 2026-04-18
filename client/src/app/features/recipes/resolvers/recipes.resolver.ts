import { inject } from '@angular/core';
import { RedirectCommand, ResolveFn, Router } from '@angular/router';
import { combineLatest, filter, map, take } from 'rxjs';
import { RecipesFacade } from '../facade/recipes.facade';
import { Recipe } from '../models/recipe.entity';

export const recipesResolver: ResolveFn<Recipe[] | RedirectCommand> = (route) => {
  const recipesFacade = inject(RecipesFacade);
  const router = inject(Router);
  const params = route.queryParams;

  recipesFacade.loadRecipes$(params);

  return combineLatest([
    recipesFacade.recipes$,
    recipesFacade.loading$,
    recipesFacade.error$,
  ]).pipe(
    filter(([, loading]) => !loading),
    take(1),
    map(([recipes, , error]) => {
      if (error) {
        return new RedirectCommand(router.parseUrl('/'));
      }
      return recipes;
    }),
  );
};
