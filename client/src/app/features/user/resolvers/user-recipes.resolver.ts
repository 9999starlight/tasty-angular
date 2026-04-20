import { inject } from '@angular/core';
import { RedirectCommand, ResolveFn, Router } from '@angular/router';
import { RecipesFacade } from '../../recipes/facade/recipes.facade';
import { UserFacade } from '../facade/user.facade';
import { combineLatest, filter, map, of, switchMap, take } from 'rxjs';
import { CurrentUser, UpdatedUser } from '../models/userTypes';
import { Recipe } from '../../recipes/models/recipe.entity';

export const userRecipesResolver: ResolveFn<{ userId: string; recipes: Recipe[] } | RedirectCommand> = () => {
  const recipesFacade = inject(RecipesFacade);
  const userFacade = inject(UserFacade);
  const router = inject(Router);

  return userFacade.currentUser$.pipe(
    take(1),
    switchMap((user: CurrentUser | UpdatedUser | null) => {
      if (!user?.userId) {
        return of(new RedirectCommand(router.parseUrl('/')));
      }
      recipesFacade.loadRecipes$({ author: user.userId });
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
          return { userId: user.userId, recipes };
        }),
      );
    }),
  );
};
