import { createFeature, createReducer, on } from '@ngrx/store';
import { CurrentUser, UpdatedUser } from '../models/userTypes';
import { UserActions } from './user.actions';
import { getUserFromToken } from './../services/user.service';
import { AuthActions } from '../../auth/store/auth.actions';

export interface UserState {
	user: CurrentUser | UpdatedUser | null;
	successMessage: string;
	loading: boolean;
	error: string | null;
}

export const initialState: UserState = {
	user: null,
	successMessage: '',
	loading: false,
	error: null,
};

export const userFeature = createFeature({
	name: 'user',
	reducer: createReducer(
		initialState,
		on(UserActions.initFromStorage, (state) => {
			const token = localStorage.getItem('token');
			const user = getUserFromToken(token);
			return {
				...state,
				user,
			};
		}),

		on(
			UserActions.updateFavorites,
			UserActions.deleteFromFavorites,
			UserActions.updateUserImage,
			UserActions.deleteRecipe,
			(state) => ({
				...state,
				loading: true,
				error: null,
				successMessage: '',
			}),
		),

		on(UserActions.updateFavoritesSuccess,
			UserActions.deleteFromFavoritesSuccess,
			UserActions.updateUserImageSuccess,
			UserActions.deleteRecipeSuccess,
			(state, { message, updatedUser }) => ({
			...state,
			loading: false,
			user: updatedUser,
			successMessage: message,
			error: null,
		})),

		on(
			UserActions.updateFavoritesFailure,
			UserActions.deleteFromFavoritesFailure,
			UserActions.updateUserImageFailure,
			UserActions.deleteRecipeFailure,
			(state, { error }) => ({
				...state,
				loading: false,
				error,
			}),
		),

		on(UserActions.clearError, (state, { error }) => ({
			...state,
			error,
		})),
		
		on(UserActions.clearSuccessMessage, (state) => ({
			...state,
			successMessage: '',
		})),

		on(AuthActions.logout, () => ({
			...initialState,
		})),
	),
});
