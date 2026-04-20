export interface SearchParams {
  author?: string | undefined;
  mealName?: string | undefined;
  title?: string | undefined;
  'ingredients.ingredient'?: string | undefined;
  dishType?: string | undefined;
  level?: string | undefined;
  vegetarian?: boolean | undefined;
  glutenFree?: boolean | undefined;
  _id?: string | string[];
}
