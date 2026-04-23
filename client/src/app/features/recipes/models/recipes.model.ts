import { RecipeComment } from './comment.model';
import { RecipeResponse } from './recipe-response.model';
export interface RecipesResponse {
  response: {
    recipes: RecipeResponse[];
  };
  count: number;
}

export interface RecipeCommentsResponse {
  response: {
    comments: RecipeComment[];
  },
  count: number;
}
