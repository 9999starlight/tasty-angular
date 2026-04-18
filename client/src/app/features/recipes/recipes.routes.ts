import { Routes } from '@angular/router';
import { recipesResolver } from './resolvers/recipes.resolver';

export const RECIPES_ROUTES: Routes = [
  {
    path: '',
    resolve: {
      recipes: recipesResolver
    },
    loadComponent: () =>
      import('../recipes/components/recipes/recipes.component').then((m) => m.RecipesComponent),
  },
];
