import { Routes } from '@angular/router';

export const USER_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/user-home/user-home.component').then((m) => m.UserHomeComponent),
  },
  {
    path: 'user-recipes',
    loadComponent: () =>
      import('./components/user-recipes/user-recipes.component').then(
        (m) => m.UserRecipesComponent,
      ),
  },
  {
    path: 'create-recipe',
    loadComponent: () =>
      import('./components/create-recipe/create-recipe.component').then(
        (m) => m.CreateRecipeComponent,
      ),
  },
  {
    path: 'saved-recipes',
    loadComponent: () =>
      import('./components/saved-recipes/saved-recipes.component').then(
        (m) => m.SavedRecipesComponent,
      ),
  },
];
