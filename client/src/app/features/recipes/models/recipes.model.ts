import { RecipeResponse } from './recipe-response.model';
export interface RecipesResponse {
  response: {
    recipes: RecipeResponse[];
    count: number;
  };
}
