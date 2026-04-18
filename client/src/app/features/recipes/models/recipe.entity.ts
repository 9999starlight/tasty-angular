import { EntityState } from '@ngrx/entity';
import { RecipeComment } from './comment.model';
import { SingleRecipe } from './single-recipe.model';

export interface Recipe {
  _id: string;
  mealName: string;
  intro: string;
  author: {
    _id: string;
    username: string;
    image: string;
  };
  comments: RecipeComment[] | string[] | [];
  createdAt: string;
  dishType: string;
  glutenFree: boolean;
  rating: number;
  rates:
    | {
        ratedBy: string;
        rate: number;
      }[]
    | [];
  request: {
    type: string;
    url: string;
  };
  image?: string | null;
}

export type RecipeSortField = 'title' | 'rating' | 'date' | null;
export type RecipeSortDirection = 'asc' | 'desc';

export interface RecipeSortConfig {
  field: RecipeSortField;
  direction: RecipeSortDirection;
}

export interface RecipesState extends EntityState<Recipe> {
  selectedRecipe: SingleRecipe | null;
  loading: boolean;
  error: string | null;
  successMessage: string;
  totalCount: number;
  sortConfig: RecipeSortConfig;
}
