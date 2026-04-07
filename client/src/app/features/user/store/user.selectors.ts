import { createSelector } from '@ngrx/store';
import { userFeature } from './user.reducer';

export const selectUserState = userFeature.selectUserState;
export const selectCurrentUser = userFeature.selectUser;
export const selectUserLoading = userFeature.selectLoading;
export const selectUserError = userFeature.selectError;
export const selectUserSuccessMessage = userFeature.selectSuccessMessage;

export const selectUserVm = createSelector(
	selectCurrentUser,
	selectUserLoading,
	selectUserError,
	selectUserSuccessMessage,
	(user, loading, error, successMessage) => ({ user, loading, error, successMessage }),
);
