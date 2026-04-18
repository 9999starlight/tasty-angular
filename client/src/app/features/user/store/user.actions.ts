import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { UpdatedUser } from '../models/userTypes';

export const UserActions = createActionGroup({
	source: 'User',
	events: {
		'Init From Storage': emptyProps(),

		'Update Favorites': props<{ favoritePayload: { favoriteId: string }; userId: string }>(),
		'Update Favorites Success': props<{ message: string; updatedUser: UpdatedUser }>(),
		'Update Favorites Failure': props<{ error: string }>(),

		'Update User Image': props<{ payload: FormData; userId: string }>(),
		'Update User Image Success': props<{ message: string; updatedUser: UpdatedUser }>(),
		'Update User Image Failure': props<{ error: string }>(),

		'Delete From Favorites': props<{ recipeId: string; userId: string }>(),
		'Delete From Favorites Success': props<{ message: string; updatedUser: UpdatedUser }>(),
		'Delete From Favorites Failure': props<{ error: string }>(),

		'Delete Recipe': props<{ recipeId: string; }>(),
		'Delete Recipe Success': props<{ message: string; updatedUser: UpdatedUser }>(),
		'Delete Recipe Failure': props<{ error: string }>(),

		'Clear Error': props<{ error: string | null }>(),
		'Clear Success Message': emptyProps()
	},
});
