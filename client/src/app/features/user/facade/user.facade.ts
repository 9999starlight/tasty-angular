import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserActions } from '../store/user.actions';
import {
  selectCurrentUser,
  selectUserError,
  selectUserLoading,
  selectUserSuccessMessage,
  selectUserVm,
} from '../store/user.selectors';

@Injectable({ providedIn: 'root' })
export class UserFacade {
  #store = inject(Store);

  currentUser$ = this.#store.select(selectCurrentUser);
  loading$ = this.#store.select(selectUserLoading);
  error$ = this.#store.select(selectUserError);
  successMessage$ = this.#store.select(selectUserSuccessMessage);
  vm$ = this.#store.select(selectUserVm);

  initFromStorage$() {
    this.#store.dispatch(UserActions.initFromStorage());
  }

  updateFavorites$(favoritePayload: { favoriteId: string }, userId: string) {
    this.#store.dispatch(UserActions.updateFavorites({ favoritePayload, userId }));
  }

  updateUserImage$(payload: FormData, userId: string) {
    this.#store.dispatch(UserActions.updateUserImage({ payload, userId }));
  }

  deleteFromFavorites$(recipeId: string, userId: string, refetchFavoritesRecipes = false) {
    this.#store.dispatch(UserActions.deleteFromFavorites({ recipeId, userId, refetchFavoritesRecipes }));
  }

  deleteRecipe$(
    recipeId: string,
    options: { skipUserUpdate?: boolean; refetchMode?: 'author' | 'all' } = {},
  ) {
    this.#store.dispatch(UserActions.deleteRecipe({ recipeId, ...options }));
  }

  clearError$(error: string | null = null) {
    this.#store.dispatch(UserActions.clearError({ error }));
  }

  clearSuccessMessage$() {
    this.#store.dispatch(UserActions.clearSuccessMessage());
  }
}
