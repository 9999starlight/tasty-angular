import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { combineLatest, map, take, filter } from 'rxjs';
import { AdminFacade } from '../facade/admin.facade';
import { RecipesFacade } from '../../recipes/facade/recipes.facade';

export const adminHomeResolver: ResolveFn<boolean> = () => {
  const adminFacade = inject(AdminFacade);
  const recipesFacade = inject(RecipesFacade);

  adminFacade.loadUsers$();
  adminFacade.loadComments$();
  recipesFacade.loadRecipes$();

  return combineLatest([adminFacade.loading$, recipesFacade.loading$]).pipe(
    filter(([adminLoading, recipesLoading]) => !adminLoading && !recipesLoading),
    take(1),
    map(() => true),
  );
};
