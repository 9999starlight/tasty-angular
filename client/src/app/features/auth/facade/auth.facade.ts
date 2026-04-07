import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoginCredentials, RegisterCredentials } from '../../user/models/userTypes';
import { AuthActions } from '../store/auth.actions';
import {
  selectAuthError,
  selectAuthLoading,
  selectIsLogged,
} from '../store/auth.selectors';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  #store = inject(Store);

  isLogged$ = this.#store.select(selectIsLogged);
  loading$ = this.#store.select(selectAuthLoading);
  error$ = this.#store.select(selectAuthError);

  initFromStorage$() {
    this.#store.dispatch(AuthActions.initFromStorage());
  }

  login$(credentials: LoginCredentials) {
    this.#store.dispatch(AuthActions.login({ credentials }));
  }

  register$(credentials: RegisterCredentials | FormData) {
    this.#store.dispatch(AuthActions.register({ credentials }));
  }

  logout$() {
    this.#store.dispatch(AuthActions.logout());
  }

  clearError$(error: string | null = null) {
    this.#store.dispatch(AuthActions.clearError({ error }));
  }
}
