import { Routes } from '@angular/router';

export const RECIPE_DETAILS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/recipe-details/recipe-details.component').then(
        (m) => m.RecipeDetailsComponent
      ),
  },
];
