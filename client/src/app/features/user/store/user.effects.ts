import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { UserService } from './../services/user.service';
import { UserActions } from './user.actions';
import { AuthActions } from '../../auth/store/auth.actions';

@Injectable()
export class UserEffects {
  private actions$ = inject(Actions);
  private userService = inject(UserService);

  syncUserAfterAuth$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginSuccess, AuthActions.registerSuccess),
      map(() => UserActions.initFromStorage()),
    ),
  );

    updateFavorites$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateFavorites),
      exhaustMap(({ id, userId }) =>
        this.userService.updateFavorites(id, userId).pipe(
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
      exhaustMap(({ recipeId, userId }) =>
        this.userService.deleteFromFavorites(recipeId, userId).pipe(
          map(({ message, updatedUser }) =>
            UserActions.deleteFromFavoritesSuccess({ message, updatedUser }),
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
}
