import { createSelector } from '@ngrx/store';
import { adminFeature } from './admin.reducer';

export const selectAdminState = adminFeature.selectAdminState;

export const selectAdminUsers = adminFeature.selectUsers;
export const selectAdminUsersCount = adminFeature.selectUsersCount;
export const selectAdminSelectedUser = adminFeature.selectSelectedUser;
export const selectAdminComments = adminFeature.selectComments;
export const selectAdminLoading = adminFeature.selectLoading;
export const selectAdminError = adminFeature.selectError;
export const selectAdminSuccessMessage = adminFeature.selectSuccessMessage;

export const selectAdminVm = createSelector(
  selectAdminUsers,
  selectAdminUsersCount,
  selectAdminSelectedUser,
  selectAdminComments,
  selectAdminLoading,
  selectAdminError,
  selectAdminSuccessMessage,
  (users, usersCount, selectedUser, comments, loading, error, successMessage) => ({
    users,
    usersCount,
    selectedUser,
    comments,
    loading,
    error,
    successMessage,
  }),
);
