import { Routes } from '@angular/router';
import { recipeResolver } from './resolvers/recipe.resolver';

export const RECIPE_DETAILS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/recipe-details/recipe-details.component').then(
        (m) => m.RecipeDetailsComponent
      ),
    resolve: {
      recipe: recipeResolver
    }
  },
];
