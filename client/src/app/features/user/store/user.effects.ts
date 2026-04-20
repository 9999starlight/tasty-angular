import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, filter, map, of } from 'rxjs';
import { getUserFromToken, UserService } from './../services/user.service';
import { UserActions } from './user.actions';
import { AuthActions } from '../../auth/store/auth.actions';
import { RecipesActions } from '../../recipes/store/recipes.actions';

@Injectable()
export class UserEffects {
  private actions$ = inject(Actions);
  private userService = inject(UserService);

  initFromStorage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.initFromStorage),
      exhaustMap(() => {
        const token = localStorage.getItem('token');
        const tokenUser = getUserFromToken(token);

        if (!tokenUser?.userId) {
          return of(UserActions.initFromStorageSuccess({ user: null }));
        }

        return this.userService.getUser(tokenUser.userId).pipe(
          map((user) => UserActions.initFromStorageSuccess({ user })),
          catchError((err) =>
            of(
              UserActions.initFromStorageFailure({
                error: err?.error?.message ?? 'Load user failed',
              }),
            ),
          ),
        );
      }),
    ),
  );

  syncUserAfterAuth$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginSuccess, AuthActions.registerSuccess),
      map(() => UserActions.initFromStorage()),
    ),
  );

  updateFavorites$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateFavorites),
      exhaustMap(({ favoritePayload, userId }) =>
        this.userService.updateFavorites(favoritePayload, userId).pipe(
          map(({ message, updatedUser }) =>
            UserActions.updateFavoritesSuccess({ message, updatedUser }),
          ),
          catchError((err) =>
            of(
              UserActions.updateFavoritesFailure({
                error: err?.error?.message ?? 'Update favorites failed',
              }),
            ),
          ),
        ),
      ),
    ),
  );

  deleteFavorites$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.deleteFromFavorites),
      exhaustMap(({ recipeId, userId, refetchFavoritesRecipes }) =>
        this.userService.deleteFromFavorites(recipeId, userId).pipe(
          map(({ message, updatedUser }) =>
            UserActions.deleteFromFavoritesSuccess({ message, updatedUser, refetchFavoritesRecipes }),
          ),
          catchError((err) =>
            of(
              UserActions.deleteFromFavoritesFailure({
                error: err?.error?.message ?? 'Delete from favorites failed',
              }),
            ),
          ),
        ),
      ),
    ),
  );

  updateUserImage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateUserImage),
      exhaustMap(({ payload, userId }) =>
        this.userService.updateUserImage(payload, userId).pipe(
          map(({ message, updatedUser }) =>
            UserActions.updateUserImageSuccess({ message, updatedUser }),
          ),
          catchError((err) =>
            of(
              UserActions.updateUserImageFailure({
                error: err?.error?.message ?? 'Update user image failed',
              }),
            ),
          ),
        ),
      ),
    ),
  );

  deleteRecipe$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.deleteRecipe),
      exhaustMap(({ recipeId }) =>
        this.userService.deleteRecipe(recipeId).pipe(
          map(({ message, userUpdate }) =>
            UserActions.deleteRecipeSuccess({ message, updatedUser: userUpdate }),
          ),
          catchError((err) =>
            of(
              UserActions.deleteRecipeFailure({
                error: err?.error?.message ?? 'Delete recipe failed',
              }),
            ),
          ),
        ),
      ),
    ),
  );

  loadUserRecipesAfterDeleteSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.deleteRecipeSuccess),
      filter(({ updatedUser }) => !!updatedUser?.userId),
      map(({ updatedUser }) =>
        RecipesActions.loadRecipes({ options: { author: updatedUser.userId } }),
      ),
    ),
  );

  refreshFavoriteRecipesAfterDeleteFavorites$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.deleteFromFavoritesSuccess),
      filter(({ refetchFavoritesRecipes }) => !!refetchFavoritesRecipes),
      map(({ updatedUser }) => {
        const favoriteIds = (updatedUser.favorites ?? [])
          .map((id) => String(id).trim())
          .filter(Boolean);

        if (favoriteIds.length === 0) {
          return RecipesActions.clearRecipesList();
        }

        return RecipesActions.loadRecipes({ options: { _id: favoriteIds } });
      }),
    ),
  );
}
