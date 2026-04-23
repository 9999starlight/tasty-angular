import { createSelector } from '@ngrx/store';
import { adminCommentsAdapter, adminFeature, adminUsersAdapter } from './admin.reducer';

export const selectAdminState = adminFeature.selectAdminState;

const adminUsersSelectors = adminUsersAdapter.getSelectors();
const adminCommentsSelectors = adminCommentsAdapter.getSelectors();

export const selectAdminUsersState = createSelector(selectAdminState, (state) => state.users);
export const selectAdminCommentsState = createSelector(selectAdminState, (state) => state.comments);
export const selectAdminSelectedUserId = createSelector(
  selectAdminState,
  (state) => state.selectedUserId,
);

export const selectAdminUsers = createSelector(selectAdminUsersState, (usersState) =>
  adminUsersSelectors.selectAll(usersState),
);
export const selectAdminUsersCount = adminFeature.selectUsersCount;
export const selectAdminUserEntities = createSelector(selectAdminUsersState, (usersState) =>
  adminUsersSelectors.selectEntities(usersState),
);
export const selectAdminSelectedUser = createSelector(
  selectAdminUserEntities,
  selectAdminSelectedUserId,
  (entities, selectedUserId) => (selectedUserId ? entities[selectedUserId] ?? null : null),
);
export const selectAdminComments = createSelector(selectAdminCommentsState, (commentsState) =>
  adminCommentsSelectors.selectAll(commentsState),
);
export const selectAdminCommentsCount = createSelector(
  selectAdminState,
  (state) => state.commentsCount,
);
export const selectAdminMostActiveUsers = createSelector(selectAdminUsers, (users) =>
  [...users]
    .sort((a, b) => b.createdRecipes.length - a.createdRecipes.length)
    .slice(0, 5)
    .map((user) => ({
      name: user.username,
      value: user.createdRecipes.length,
    })),
);
export const selectAdminLatestComments = createSelector(
	selectAdminComments, (comments) =>
	[...comments]
    .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
		.slice(0, 10)
);
export const selectAdminLoading = adminFeature.selectLoading;
export const selectAdminError = adminFeature.selectError;
export const selectAdminSuccessMessage = adminFeature.selectSuccessMessage;

export const selectAdminVm = createSelector(
  selectAdminUsers,
  selectAdminUsersCount,
  selectAdminSelectedUser,
  selectAdminComments,
  selectAdminCommentsCount,
  selectAdminLoading,
  selectAdminError,
  selectAdminSuccessMessage,

  (users, usersCount, selectedUser, comments, commentsCount, loading, error, successMessage) => ({
    users,
    usersCount,
    selectedUser,
    comments,
    commentsCount,
    loading,
    error,
    successMessage,
  }),
);
