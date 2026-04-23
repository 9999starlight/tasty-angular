import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';
import { AdminService } from '../services/admin.service';
import { AdminActions } from './admin.actions';
import { RecipeCommentsResponse } from '../../recipes/models/recipes.model';

@Injectable()
export class AdminEffects {
  private actions$ = inject(Actions);
  private adminService = inject(AdminService);

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.loadUsers),
      exhaustMap(() =>
        this.adminService.getUsers().pipe(
          map((res) =>
            AdminActions.loadUsersSuccess({
              users: res.response.users,
              count: res.count,
            }),
          ),
          catchError((err) =>
            of(
              AdminActions.loadUsersFailure({
                error: err?.error?.message ?? 'Load users failed',
              }),
            ),
          ),
        ),
      ),
    ),
  );

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.loadUser),
      exhaustMap(({ id }) =>
        this.adminService.getUser(id).pipe(
          map((user) => AdminActions.loadUserSuccess({ user })),
          catchError((err) =>
            of(
              AdminActions.loadUserFailure({
                error: err?.error?.message ?? 'Load user failed',
              }),
            ),
          ),
        ),
      ),
    ),
  );

  loadComments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.loadComments),
      exhaustMap(() =>
        this.adminService.getComments().pipe(
          map((res) => AdminActions.loadCommentsSuccess({
              comments: res.response.comments,
              count: res.count,
            })
          ),
          catchError((err) =>
            of(
              AdminActions.loadCommentsFailure({
                error: err?.error?.message ?? 'Load comments failed',
              }),
            ),
          ),
        ),
      ),
    ),
  );

  patchUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.patchUser),
      exhaustMap(({ userId, change, payload }) =>
        this.adminService.patchUser(userId, change, payload).pipe(
          map(({ message, updatedUser }) =>
            AdminActions.patchUserSuccess({
              message,
              user: updatedUser,
            }),
          ),
          catchError((err) =>
            of(
              AdminActions.patchUserFailure({
                error: err?.error?.message ?? 'Patch user failed',
              }),
            ),
          ),
        ),
      ),
    ),
  );

  deleteComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.deleteComment),
      exhaustMap(({ id }) =>
        this.adminService.deleteComment(id).pipe(
          map((res) =>
            AdminActions.deleteCommentSuccess({
              message: res?.message ?? 'Comment deleted successfully',
              id,
            }),
          ),
          catchError((err) =>
            of(
              AdminActions.deleteCommentFailure({
                error: err?.error?.message ?? 'Delete comment failed',
              }),
            ),
          ),
        ),
      ),
    ),
  );

  

}
