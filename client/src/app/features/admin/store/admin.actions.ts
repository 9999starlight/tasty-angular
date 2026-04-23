import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { RecipeComment } from '../../recipes/models/comment.model';
import { UpdatedUser } from '../../user/models/userTypes';

export const AdminActions = createActionGroup({
  source: 'Admin',
  events: {
    'Load Users': emptyProps(),
    'Load Users Success': props<{ users: UpdatedUser[]; count: number }>(),
    'Load Users Failure': props<{ error: string }>(),

    'Set Selected User ID': props<{ id: string | null}>(),

    'Load User': props<{ id: string }>(),
    'Load User Success': props<{ user: UpdatedUser }>(),
    'Load User Failure': props<{ error: string }>(),

    'Load Comments': emptyProps(),
    'Load Comments Success': props<{ comments: RecipeComment[]; count: number }>(),
    'Load Comments Failure': props<{ error: string }>(),

    'Patch User': props<{ userId: string; change: string; payload: object }>(),
    'Patch User Success': props<{ message: string; user: UpdatedUser }>(),
    'Patch User Failure': props<{ error: string }>(),

    'Delete Comment': props<{ id: string }>(),
    'Delete Comment Success': props<{ message: string; id: string }>(),
    'Delete Comment Failure': props<{ error: string }>(),

    'Clear Error': props<{ error: string | null }>(),
    'Clear Success Message': emptyProps(),
  },
});
