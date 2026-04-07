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

  updateFavorites$(id: {}, userId: string) {
    this.#store.dispatch(UserActions.updateFavorites({ id, userId }));
  }

  updateUserImage$(payload: FormData, userId: string) {
    this.#store.dispatch(UserActions.updateUserImage({ payload, userId }));
  }

  deleteFromFavorites$(recipeId: string, userId: string) {
    this.#store.dispatch(UserActions.deleteFromFavorites({ recipeId, userId }));
  }

  clearError$(error: string | null = null) {
    this.#store.dispatch(UserActions.clearError({ error }));
  }
}
