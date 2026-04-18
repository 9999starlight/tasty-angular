import { RecipeComment } from './comment.model';
export interface SingleRecipe {
  _id: string;
  mealName: string;
  intro: string;
  author: {
    _id: string;
    username: string;
    user_image?: {
      url: string;
      id: string;
    };
    createdRecipes: string[] | [];
  };
  comments: RecipeComment[];
  createdAt: string;
  dishType: string;
  glutenFree?: boolean;
  rates: Rate[];
  request: {
    type: string;
    url: string;
  };
  level?: string;
  vegetarian?: boolean;
  timing: number;
  persons: number;
  rating?: number;
  steps: Step[];
  ingredients: Ingredient[];
  regional?: string;
  image?: {
    id: string;
    url: string;
  };
}

export interface Rate {
  ratedBy: string;
  rate: number;
}

export interface Ingredient {
  ingredient: string;
  amount?: number | string;
}

export interface Step {
  step: string;
}
