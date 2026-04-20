import { createFeature, createReducer, on } from '@ngrx/store';
import { RecipeComment } from '../../recipes/models/comment.model';
import { UpdatedUser } from '../../user/models/userTypes';
import { AdminActions } from './admin.actions';

export interface AdminState {
  users: UpdatedUser[];
  usersCount: number;
  selectedUser: UpdatedUser | null;
  comments: RecipeComment[];
  loading: boolean;
  error: string | null;
  successMessage: string;
}

export const initialState: AdminState = {
  users: [],
  usersCount: 0,
  selectedUser: null,
  comments: [],
  loading: false,
  error: null,
  successMessage: '',
};

export const adminFeature = createFeature({
  name: 'admin',
  reducer: createReducer(
    initialState,

    on(
      AdminActions.loadUsers,
      AdminActions.loadUser,
      AdminActions.loadComments,
      AdminActions.patchUser,
      AdminActions.deleteComment,
      (state) => ({
        ...state,
        loading: true,
        error: null,
        successMessage: '',
      }),
    ),

    on(AdminActions.loadUsersSuccess, (state, { users, count }) => ({
      ...state,
      users,
      usersCount: count,
      loading: false,
      error: null,
    })),

    on(AdminActions.loadUserSuccess, (state, { user }) => ({
      ...state,
      selectedUser: user,
      loading: false,
      error: null,
    })),

    on(AdminActions.loadCommentsSuccess, (state, { comments }) => ({
      ...state,
      comments,
      loading: false,
      error: null,
    })),

    on(AdminActions.patchUserSuccess, (state, { message }) => ({
      ...state,
      loading: false,
      successMessage: message,
      error: null,
    })),

    on(AdminActions.deleteCommentSuccess, (state, { message, id }) => ({
      ...state,
      comments: state.comments.filter((comment) => comment._id !== id),
      loading: false,
      successMessage: message,
      error: null,
    })),

    on(
      AdminActions.loadUsersFailure,
      AdminActions.loadUserFailure,
      AdminActions.loadCommentsFailure,
      AdminActions.patchUserFailure,
      AdminActions.deleteCommentFailure,
      (state, { error }) => ({
        ...state,
        loading: false,
        error,
      }),
    ),

    on(AdminActions.clearError, (state, { error }) => ({
      ...state,
      error,
    })),

    on(AdminActions.clearSuccessMessage, (state) => ({
      ...state,
      successMessage: '',
    })),
  ),
});
