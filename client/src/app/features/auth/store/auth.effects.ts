import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, switchMap, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AuthActions } from './auth.actions';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private router = inject(Router);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      exhaustMap(({ credentials }) =>
        this.authService.login(credentials).pipe(
          map((token) => AuthActions.loginSuccess({ token })),
          catchError((err) =>
            of(AuthActions.loginFailure({ error: err?.error?.message ?? 'Login failed' })),
          ),
        ),
      ),
    ),
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      exhaustMap(({ credentials }) =>
        this.authService.register(credentials).pipe(
          map((token) => AuthActions.registerSuccess({ token })),
          catchError((err) =>
            of(AuthActions.registerFailure({ error: err?.error?.message ?? 'Register failed' })),
          ),
        ),
      ),
    ),
  );

  redirectAfterAuth$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess, AuthActions.registerSuccess),
        tap(() => this.router.navigateByUrl('')),
      ),
    { dispatch: false },
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => this.authService.signout()),
      ),
    { dispatch: false },
  );
}
