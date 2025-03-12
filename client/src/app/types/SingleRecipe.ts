import { Comment } from './Comment';
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
  comments: Comment[] | [];
  createdAt: string;
  dishType: string;
  glutenFree?: boolean;
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
