import { RedirectCommand, ResolveFn, Router } from '@angular/router';
import { Recipe } from '../../recipes/models/recipe.entity';
import { inject } from '@angular/core';
import { RecipesFacade } from '../../recipes/facade/recipes.facade';
import { UserFacade } from '../facade/user.facade';
import { combineLatest, filter, map, of, switchMap, take } from 'rxjs';
import { CurrentUser, UpdatedUser } from '../models/userTypes';

export const userFavoritesResolver: ResolveFn<{ userId: string; recipes: Recipe[] } | RedirectCommand> = (route, state) => {
  const recipesFacade = inject(RecipesFacade);
  const userFacade = inject(UserFacade);
  const router = inject(Router);

  return userFacade.currentUser$.pipe(
    take(1),
    switchMap((user: CurrentUser | UpdatedUser | null) => {
      if (!user?.userId) {
        return of(new RedirectCommand(router.parseUrl('/')));
      }
      const favoriteIds = (user.favorites ?? []).filter((id): id is string => Boolean(id));
      if (favoriteIds.length === 0) {
        return of({ userId: user.userId, recipes: [] });
      }
      recipesFacade.loadRecipes$({
        _id: favoriteIds,
      });
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
