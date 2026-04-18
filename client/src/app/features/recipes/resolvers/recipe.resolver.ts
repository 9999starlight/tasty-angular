import { inject } from '@angular/core';
import { RedirectCommand, ResolveFn, Router } from '@angular/router';
import { RecipesFacade } from '../facade/recipes.facade';
import { SingleRecipe } from '../models/single-recipe.model';
import { combineLatest, filter, map, take } from 'rxjs';

export const recipeResolver: ResolveFn<SingleRecipe | RedirectCommand> = (route) => {
  const router = inject(Router);
  const recipesFacade = inject(RecipesFacade);
  const id = route.paramMap.get('id') ?? '';

  recipesFacade.loadSingleRecipe$(id);

  return combineLatest([
    recipesFacade.selectedRecipe$,
    recipesFacade.loading$,
    recipesFacade.error$,
  ]).pipe(
    filter(([, loading]) => !loading),
    take(1),
    map(([recipe, , error]) => {
      if (error || !recipe || recipe._id !== id) {
        return new RedirectCommand(router.parseUrl('/not-found'));
      }
      return recipe;
    }),
  );
};
