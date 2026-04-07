import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { LoginCredentials, RegisterCredentials, CurrentUser, UpdatedUser } from '../../user/models/userTypes';

export const AuthActions = createActionGroup({
	source: 'Auth',
	events: {
	'Init From Storage': emptyProps(),
	'Login': props<{ credentials: LoginCredentials }>(),
	'Login Success': props<{ token: string | null }>(),
	'Login Failure': props<{ error: string }>(),

	'Register': props<{ credentials: RegisterCredentials | FormData }>(),
	'Register Success': props<{ token: string | null }>(),
	'Register Failure': props<{ error: string }>(),

	'Logout': emptyProps(),

	'Clear Error': props<{ error: string | null }>(),
	},
});