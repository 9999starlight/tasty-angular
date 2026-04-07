import { createFeature, createReducer, on } from '@ngrx/store';
import { AuthActions } from './auth.actions';

export interface AuthState {
	isLogged: boolean;
	successMessage: string;
	loading: boolean;
	error: string | null;
}

export const initialState: AuthState = {
	isLogged: false,
	successMessage: '',
	loading: false,
	error: null,
};

export const authFeature = createFeature({
	name: 'auth',
	reducer: createReducer(
		initialState,
		on(AuthActions.initFromStorage, (state) => {
			const token = localStorage.getItem('token');

			return {
				...state,
				isLogged: !!token,
			};
		}),

		on(AuthActions.login, AuthActions.register, (state) => ({
			...state,
			loading: true,
			error: null,
		})),

		on(AuthActions.loginSuccess, AuthActions.registerSuccess, (state, { token }) => ({
			...state,
			loading: false,
			isLogged: !!token,
			error: null,
		})),
		
		on(AuthActions.loginFailure, AuthActions.registerFailure, (state, { error }) => ({
			...state,
			loading: false,
			error,
			isLogged: false,
		})),

		on(AuthActions.logout, () => ({
			...initialState,
		})),

		on(AuthActions.clearError, (state, { error }) => ({
  		...state,
			error,
		})),
	),
});