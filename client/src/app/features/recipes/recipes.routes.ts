import { Routes } from '@angular/router';

export const RECIPES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../recipes/components/recipes/recipes.component').then((m) => m.RecipesComponent),
  },
];
