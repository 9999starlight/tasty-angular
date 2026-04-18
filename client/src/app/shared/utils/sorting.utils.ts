import {
  Recipe,
  RecipeSortDirection,
  RecipeSortField,
} from '../../features/recipes/models/recipe.entity';

export type SortDirection = 'asc' | 'desc';

export function sortByText<T>(
  items: T[],
  valueSelector: (item: T) => string | null | undefined,
  direction: SortDirection = 'asc',
): T[] {
  return [...items].sort((firstItem, secondItem) => {
    const firstValue = (valueSelector(firstItem) ?? '').toLowerCase();
    const secondValue = (valueSelector(secondItem) ?? '').toLowerCase();

    return direction === 'asc'
      ? firstValue.localeCompare(secondValue)
      : secondValue.localeCompare(firstValue);
  });
}

export function sortByNumber<T>(
  items: T[],
  valueSelector: (item: T) => number | null | undefined,
  direction: SortDirection = 'asc',
): T[] {
  return [...items].sort((firstItem, secondItem) => {
    const firstValue = valueSelector(firstItem) ?? 0;
    const secondValue = valueSelector(secondItem) ?? 0;

    return direction === 'asc'
      ? firstValue - secondValue
      : secondValue - firstValue;
  });
}

export function sortByDate<T>(
  items: T[],
  valueSelector: (item: T) => string | Date | null | undefined,
  direction: SortDirection = 'asc',
): T[] {
  return [...items].sort((firstItem, secondItem) => {
    const firstValue = new Date(valueSelector(firstItem) ?? 0).getTime();
    const secondValue = new Date(valueSelector(secondItem) ?? 0).getTime();

    return direction === 'asc'
      ? firstValue - secondValue
      : secondValue - firstValue;
  });
}

export function sortTitleAscending(recipes: Recipe[]): Recipe[] {
  return sortByText(recipes, (recipe) => recipe.mealName, 'asc');
}

export function sortTitleDescending(recipes: Recipe[]): Recipe[] {
  return sortByText(recipes, (recipe) => recipe.mealName, 'desc');
}

export function sortRatingAscending(recipes: Recipe[]): Recipe[] {
  return sortByNumber(recipes, (recipe) => recipe.rating, 'asc');
}

export function sortRatingDescending(recipes: Recipe[]): Recipe[] {
  return sortByNumber(recipes, (recipe) => recipe.rating, 'desc');
}

export function sortDateAscending(recipes: Recipe[]): Recipe[] {
  return sortByDate(recipes, (recipe) => recipe.createdAt, 'asc');
}

export function sortDateDescending(recipes: Recipe[]): Recipe[] {
  return sortByDate(recipes, (recipe) => recipe.createdAt, 'desc');
}

export function sortRecipes(
  recipes: Recipe[],
  field: RecipeSortField,
  direction: RecipeSortDirection,
): Recipe[] {
  if (!field) {
    return recipes;
  }

  switch (field) {
    case 'title':
      return direction === 'asc'
        ? sortTitleAscending(recipes)
        : sortTitleDescending(recipes);

    case 'rating':
      return direction === 'asc'
        ? sortRatingAscending(recipes)
        : sortRatingDescending(recipes);

    case 'date':
      return direction === 'asc'
        ? sortDateAscending(recipes)
        : sortDateDescending(recipes);

    default:
      return recipes;
  }
}

export function pickRandomItems<T>(items: T[], count: number): T[] {
  const shuffled = [...items];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, count);
}
