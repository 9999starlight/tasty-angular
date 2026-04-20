import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { RecipeComment, CommentPost } from '../models/comment.model';
import { Recipe } from '../models/recipe.entity';
import { SingleRecipe } from '../models/single-recipe.model';

export const RecipesActions = createActionGroup({
  source: 'Recipes',
  events: {
    'Load Recipes': props<{ options?: any }>(),
    'Load Recipes Success': props<{ recipes: Recipe[]; count: number }>(),
    'Load Recipes Failure': props<{ error: string }>(),
    'Clear Recipes List': emptyProps(),

    'Load Single Recipe': props<{ id: string }>(),
    'Load Single Recipe Success': props<{ recipe: SingleRecipe }>(),
    'Load Single Recipe Failure': props<{ error: string }>(),

    'Create Recipe': props<{ recipeData: any }>(),
    'Create Recipe Success': props<{ message: string; createdRecipe: SingleRecipe }>(),
    'Create Recipe Failure': props<{ error: string }>(),

    'Update Recipe': props<{ id: string; recipeData: any }>(),
    'Update Recipe Success': props<{ message: string; updatedRecipe: SingleRecipe }>(),
    'Update Recipe Failure': props<{ error: string }>(),

    'Update Rating': props<{ id: string; userRate: number }>(),
    'Update Rating Success': props<{ message: string; id: string }>(),
    'Update Rating Failure': props<{ error: string }>(),

    'Post Comment': props<{ commentData: CommentPost }>(),
    'Post Comment Success': props<{ message: string; createdComment: RecipeComment }>(),
    'Post Comment Failure': props<{ error: string }>(),

    'Set Sort': props<{ field: 'title' | 'rating' | 'date'; direction: 'asc' | 'desc' }>(),

    'Clear Error': props<{ error: string | null }>(),
    'Clear Success Message': emptyProps(),
  },
});
