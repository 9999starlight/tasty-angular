import { RecipeResponse } from './RecipeResponse';
export interface RecipesResponse {
  response: {
    recipes: RecipeResponse;
    count: number;
  };
}
