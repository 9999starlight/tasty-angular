export interface SearchParams {
  mealName?: string | undefined;
  title?: string | undefined;
  'ingredients.ingredient'?: string | undefined;
  dishType?: string | undefined;
  level?: string | undefined;
  vegetarian?: boolean | undefined;
  glutenFree?: boolean | undefined;
}
