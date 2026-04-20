import { Routes } from '@angular/router';
import { userRecipesResolver } from './resolvers/user-recipes.resolver';
import { userFavoritesResolver } from './resolvers/user-favorites.resolver';

export const USER_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/user-home/user-home.component').then((m) => m.UserHomeComponent),
  },
  {
    path: 'user-recipes',
    resolve: {
      userRecipesData: userRecipesResolver,
    },
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
    resolve: {
      favorites: userFavoritesResolver,
    },
    loadComponent: () =>
      import('./components/saved-recipes/saved-recipes.component').then(
        (m) => m.SavedRecipesComponent,
      ),
  },
];
