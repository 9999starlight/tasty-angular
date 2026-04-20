import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, switchMap, tap } from 'rxjs';
import { CommentService } from '../services/comment.service';
import { RecipesService } from '../services/recipes.service';
import { RecipesActions } from './recipes.actions';
import { RecipesResponse } from '../models/recipes.model';
import { SingleRecipe } from '../models/single-recipe.model';
import { UpdatedUser } from '../../user/models/userTypes';
import { UserActions } from '../../user/store/user.actions';

@Injectable()
export class RecipesEffects {
  private actions$ = inject(Actions);
  private recipesService = inject(RecipesService);
  private commentService = inject(CommentService);
  private router = inject(Router);

  loadRecipes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipesActions.loadRecipes),
      switchMap(({ options }) =>
        this.recipesService.getRecipes(options).pipe(
          map((res: RecipesResponse) =>
            RecipesActions.loadRecipesSuccess({
              recipes: res.response.recipes,
              count: res.response.count,
            }),
          ),
          catchError((err) =>
            of(
              RecipesActions.loadRecipesFailure({
                error: err?.error?.message ?? 'Load recipes failed',
              }),
            ),
          ),
        ),
      ),
    ),
  );

  loadSingleRecipe$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipesActions.loadSingleRecipe),
      switchMap(({ id }) =>
        this.recipesService.getSingleRecipe(id).pipe(
          map((recipe: SingleRecipe) => RecipesActions.loadSingleRecipeSuccess({ recipe })),
          catchError((err) =>
            of(
              RecipesActions.loadSingleRecipeFailure({
                error: err?.error?.message ?? 'Load single recipe failed',
              }),
            ),
          ),
        ),
      ),
    ),
  );

  createRecipe$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipesActions.createRecipe),
      exhaustMap(({ recipeData }) =>
        this.recipesService.createRecipe(recipeData).pipe(
          switchMap((res: { message: string; createdRecipe: SingleRecipe; updatedUser: UpdatedUser }) =>
            [
              RecipesActions.createRecipeSuccess({
                message: res.message,
                createdRecipe: res.createdRecipe,
              }),
              UserActions.syncCurrentUser({ updatedUser: res.updatedUser }),
            ],
          ),
          catchError((err) =>
            of(
              RecipesActions.createRecipeFailure({
                error: err?.error?.message ?? 'Create recipe failed',
              }),
            ),
          ),
        ),
      ),
    ),
  );

  updateRecipe$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipesActions.updateRecipe),
      exhaustMap(({ id, recipeData }) =>
        this.recipesService.updateRecipe(id, recipeData).pipe(
          map((res: { message: string; updatedRecipe: SingleRecipe }) =>
            RecipesActions.updateRecipeSuccess({
              message: res.message,
              updatedRecipe: res.updatedRecipe,
            }),
          ),
          catchError((err) =>
            of(
              RecipesActions.updateRecipeFailure({
                error: err?.error?.message ?? 'Update recipe failed',
              }),
            ),
          ),
        ),
      ),
    ),
  );

  updateRating$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipesActions.updateRating),
      exhaustMap(({ id, userRate }) =>
        this.recipesService.updateRating(id, userRate).pipe(
          map((res: any) =>
            RecipesActions.updateRatingSuccess({
              message: res?.message ?? 'Rating updated successfully',
              id,
            }),
          ),
          catchError((err) =>
            of(
              RecipesActions.updateRatingFailure({
                error: err?.error?.message ?? 'Update rating failed',
              }),
            ),
          ),
        ),
      ),
    ),
  );

  postComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipesActions.postComment),
      exhaustMap(({ commentData }) =>
        this.commentService.postComment(commentData).pipe(
          map((res) =>
            RecipesActions.postCommentSuccess({
              message: res.message,
              createdComment: res.createdComment,
            }),
          ),
          catchError((err) =>
            of(
              RecipesActions.postCommentFailure({
                error: err?.error?.message ?? 'Post comment failed',
              }),
            ),
          ),
        ),
      ),
    ),
  );

  refreshSingleRecipeAfterComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipesActions.postCommentSuccess),
      map(({ createdComment }) =>
        RecipesActions.loadSingleRecipe({ id: createdComment.commentedRecipeId }),
      ),
    ),
  );

  refreshSingleRecipeAfterRating$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipesActions.updateRatingSuccess),
      map(({ id }) => RecipesActions.loadSingleRecipe({ id })),
    ),
  );

  navigateAfterCreateRecipeSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RecipesActions.createRecipeSuccess),
        tap(({ createdRecipe }) => {
          this.router.navigate([`recipe/${createdRecipe._id}`]);
        }),
      ),
    { dispatch: false },
  );

  navigateAfterUpdateRecipeSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RecipesActions.updateRecipeSuccess),
        tap(({ updatedRecipe }) => {
          this.router.navigate([`recipe/${updatedRecipe._id}`]);
        }),
      ),
    { dispatch: false },
  );
}
