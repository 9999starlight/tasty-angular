import { createSelector } from '@ngrx/store';
import { authFeature } from './auth.reducer';

export const selectAuthState = authFeature.selectAuthState;
export const selectIsLogged = authFeature.selectIsLogged;
export const selectAuthLoading = authFeature.selectLoading;
export const selectAuthError = authFeature.selectError;

export const selectAuthVm = createSelector(
	selectIsLogged,
	selectAuthLoading,
	selectAuthError,
	(isLogged, loading, error) => ({ isLogged, loading, error })
);