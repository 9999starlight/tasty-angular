import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createFeature, createReducer, on } from '@ngrx/store';
import { RecipeComment } from '../../recipes/models/comment.model';
import { UpdatedUser } from '../../user/models/userTypes';
import { AdminActions } from './admin.actions';

export const adminUsersAdapter = createEntityAdapter<UpdatedUser>({
  selectId: (user) => user.userId,
});

export const adminCommentsAdapter = createEntityAdapter<RecipeComment>({
  selectId: (comment) => comment._id,
});

export interface AdminState {
  users: EntityState<UpdatedUser>;
  usersCount: number;
  selectedUserId: string | null;
  comments: EntityState<RecipeComment>;
  commentsCount: number;
  loading: boolean;
  error: string | null;
  successMessage: string;
}

export const initialState: AdminState = {
  users: adminUsersAdapter.getInitialState(),
  usersCount: 0,
  selectedUserId: null,
  comments: adminCommentsAdapter.getInitialState(),
  commentsCount: 0,
  loading: false,
  error: null,
  successMessage: '',
};

export const adminFeature = createFeature({
  name: 'admin',
  reducer: createReducer(
    initialState,

    on(AdminActions.setSelectedUserID, (state, { id }) => ({
      ...state,
      selectedUserId: id,
      loading: false,
      error: null,
    })),

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
      users: adminUsersAdapter.setAll(users, state.users),
      usersCount: count,
      loading: false,
      error: null,
    })),

    on(AdminActions.loadUserSuccess, (state, { user }) => ({
      ...state,
      users: adminUsersAdapter.upsertOne(user, state.users),
      selectedUserId: user.userId,
      loading: false,
      error: null,
    })),

    on(AdminActions.loadCommentsSuccess, (state, { comments, count }) => ({
      ...state,
      comments: adminCommentsAdapter.setAll(comments, state.comments),
      commentsCount: count,
      loading: false,
      error: null,
    })),

    on(AdminActions.patchUserSuccess, (state, { message, user }) => ({
      ...state,
      users: adminUsersAdapter.upsertOne(user, state.users),
      selectedUserId: state.selectedUserId === user.userId ? user.userId : state.selectedUserId,
      loading: false,
      successMessage: message,
      error: null,
    })),

    on(AdminActions.deleteCommentSuccess, (state, { message, id }) => ({
      ...state,
      comments: adminCommentsAdapter.removeOne(id, state.comments),
      commentsCount: Math.max(0, state.commentsCount - 1),
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
