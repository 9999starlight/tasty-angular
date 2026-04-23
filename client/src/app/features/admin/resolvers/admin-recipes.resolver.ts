import { ResolveFn } from '@angular/router';
import { RecipesFacade } from '../../recipes/facade/recipes.facade';
import { combineLatest, filter, map, take, tap } from 'rxjs';
import { inject } from '@angular/core';

export const adminRecipesResolver: ResolveFn<boolean> = (route, state) => {
  const recipesFacade = inject(RecipesFacade);
  return combineLatest([
    recipesFacade.totalCount$,
    recipesFacade.loading$,
    recipesFacade.error$,
  ]).pipe(
    tap(([count, loading]) => {
      if(count === 0 && !loading){
        recipesFacade.loadRecipes$();
      }
    }),
    filter(([count, loading, error]) => (count > 0 && !loading) || (!!error && !loading)),
    take(1),
    map(() => true),
  );
};
