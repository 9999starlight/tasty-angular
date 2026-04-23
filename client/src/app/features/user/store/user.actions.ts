import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CurrentUser, UpdatedUser } from '../models/userTypes';

export const UserActions = createActionGroup({
	source: 'User',
	events: {
		'Init From Storage': emptyProps(),
		'Init From Storage Success': props<{ user: CurrentUser | UpdatedUser | null }>(),
		'Init From Storage Failure': props<{ error: string }>(),
		'Sync Current User': props<{ updatedUser: UpdatedUser }>(),

		'Update Favorites': props<{ favoritePayload: { favoriteId: string }; userId: string }>(),
		'Update Favorites Success': props<{ message: string; updatedUser: UpdatedUser }>(),
		'Update Favorites Failure': props<{ error: string }>(),

		'Update User Image': props<{ payload: FormData; userId: string }>(),
		'Update User Image Success': props<{ message: string; updatedUser: UpdatedUser }>(),
		'Update User Image Failure': props<{ error: string }>(),

		'Delete From Favorites': props<{ recipeId: string; userId: string; refetchFavoritesRecipes?: boolean }>(),
		'Delete From Favorites Success': props<{ message: string; updatedUser: UpdatedUser; refetchFavoritesRecipes?: boolean }>(),
		'Delete From Favorites Failure': props<{ error: string }>(),

		'Delete Recipe': props<{ recipeId: string; skipUserUpdate?: boolean; refetchMode?: 'author' | 'all' }>(),
		'Delete Recipe Success': props<{ message: string; updatedUser: UpdatedUser; skipUserUpdate?: boolean; refetchMode?: 'author' | 'all' }>(),
		'Delete Recipe Failure': props<{ error: string }>(),

		'Clear Error': props<{ error: string | null }>(),
		'Clear Success Message': emptyProps()
	},
});
