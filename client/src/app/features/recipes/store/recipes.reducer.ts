import { createEntityAdapter } from '@ngrx/entity';
import { createFeature, createReducer, on } from '@ngrx/store';
import { Recipe, RecipeSortConfig, RecipesState } from '../models/recipe.entity';
import { RecipesActions } from './recipes.actions';

export const recipesAdapter = createEntityAdapter<Recipe>({
  selectId: (recipe) => recipe._id,
});

const initialSortConfig: RecipeSortConfig = {
  field: null,
  direction: 'asc',
};

export const initialState: RecipesState = recipesAdapter.getInitialState({
  selectedRecipe: null,
  loading: false,
  error: null,
  successMessage: '',
  totalCount: 0,
  sortConfig: initialSortConfig,
});

export const recipesFeature = createFeature({
  name: 'recipes',
  reducer: createReducer(
    initialState,

    on(RecipesActions.loadRecipes, (state) => ({
      ...state,
      loading: true,
      error: null,
      successMessage: '',
    })),

    on(RecipesActions.loadRecipesSuccess, (state, { recipes, count }) =>
      recipesAdapter.setAll(recipes, {
        ...state,
        loading: false,
        totalCount: count,
        error: null,
      }),
    ),

    on(RecipesActions.loadRecipesFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })),

    on(RecipesActions.clearRecipesList, (state) =>
      recipesAdapter.setAll([], {
        ...state,
        loading: false,
        totalCount: 0,
        error: null,
      }),
    ),

    on(RecipesActions.loadSingleRecipe, (state) => ({
      ...state,
      selectedRecipe: null,
      loading: true,
      error: null,
    })),

    on(RecipesActions.loadSingleRecipeSuccess, (state, { recipe }) =>
      ({
        ...state,
        selectedRecipe: recipe,
        loading: false,
        error: null,
      }),
    ),

    on(RecipesActions.loadSingleRecipeFailure, (state, { error }) => ({
      ...state,
      selectedRecipe: null,
      loading: false,
      error,
    })),

    on(RecipesActions.createRecipe, (state) => ({
      ...state,
      loading: true,
      error: null,
      successMessage: '',
    })),

    on(RecipesActions.createRecipeSuccess, (state, { message, createdRecipe }) =>
      ({
        ...state,
        selectedRecipe: createdRecipe,
        loading: false,
        successMessage: message,
        error: null,
      }),
    ),

    on(RecipesActions.createRecipeFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })),

    on(RecipesActions.updateRecipe, (state) => ({
      ...state,
      loading: true,
      error: null,
      successMessage: '',
    })),

    on(RecipesActions.updateRecipeSuccess, (state, { message, updatedRecipe }) =>
      ({
        ...state,
        selectedRecipe: updatedRecipe,
        loading: false,
        successMessage: message,
        error: null,
      }),
    ),

    on(RecipesActions.updateRecipeFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })),

    on(RecipesActions.updateRating, (state) => ({
      ...state,
      loading: true,
      error: null,
    })),

    on(RecipesActions.updateRatingSuccess, (state, { message }) => ({
      ...state,
      loading: false,
      successMessage: message,
      error: null,
    })),

    on(RecipesActions.updateRatingFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })),

    on(RecipesActions.postComment, (state) => ({
      ...state,
      loading: true,
      error: null,
      successMessage: '',
    })),

    on(RecipesActions.postCommentSuccess, (state, { message }) => {
      return {
        ...state,
        loading: false,
        successMessage: message,
        error: null,
      };
    }),

    on(RecipesActions.postCommentFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })),

    on(RecipesActions.setSort, (state, { field, direction }) => ({
      ...state,
      sortConfig: { field, direction },
    })),

    on(RecipesActions.clearError, (state, { error }) => ({
      ...state,
      error,
    })),

    on(RecipesActions.clearSuccessMessage, (state) => ({
      ...state,
      successMessage: '',
    })),
  ),
});
