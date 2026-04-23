import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AdminActions } from '../store/admin.actions';
import {
  selectAdminComments,
  selectAdminCommentsCount,
  selectAdminError,
  selectAdminLatestComments,
  selectAdminLoading,
  selectAdminMostActiveUsers,
  selectAdminSelectedUser,
  selectAdminSuccessMessage,
  selectAdminUsers,
  selectAdminUsersCount,
  selectAdminVm,
} from '../store/admin.selectors';

@Injectable({ providedIn: 'root' })
export class AdminFacade {
  #store = inject(Store);

  users$ = this.#store.select(selectAdminUsers);
  mostActiveUsers$ = this.#store.select(selectAdminMostActiveUsers);
  usersCount$ = this.#store.select(selectAdminUsersCount);
  selectedUser$ = this.#store.select(selectAdminSelectedUser);
  comments$ = this.#store.select(selectAdminComments);
	commentsCount$ = this.#store.select(selectAdminCommentsCount);
	latestComments$ = this.#store.select(selectAdminLatestComments);
  loading$ = this.#store.select(selectAdminLoading);
  error$ = this.#store.select(selectAdminError);
  successMessage$ = this.#store.select(selectAdminSuccessMessage);
  vm$ = this.#store.select(selectAdminVm);

  loadUsers$() {
    this.#store.dispatch(AdminActions.loadUsers());
  }

  loadUser$(id: string) {
    this.#store.dispatch(AdminActions.loadUser({ id }));
  }

  loadComments$() {
    this.#store.dispatch(AdminActions.loadComments());
  }

  setSelectedUserID$(id: string | null) {
    this.#store.dispatch(AdminActions.setSelectedUserID({ id }));
  }

  patchUser$(userId: string, change: string, payload: object) {
    this.#store.dispatch(AdminActions.patchUser({ userId, change, payload }));
  }

  deleteComment$(id: string) {
    this.#store.dispatch(AdminActions.deleteComment({ id }));
  }

  clearError$(error: string | null = null) {
    this.#store.dispatch(AdminActions.clearError({ error }));
  }

  clearSuccessMessage$() {
    this.#store.dispatch(AdminActions.clearSuccessMessage());
  }
}
