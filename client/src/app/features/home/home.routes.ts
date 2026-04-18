import { Routes } from '@angular/router';
import { homeRecipesResolver } from './resolvers/home-recipes.resolver';

export const HOME_ROUTES: Routes = [
  {
    path: '',
    resolve: {
      homeRecipes: homeRecipesResolver,
    },
    loadComponent: () =>
      import('./components/home-page/home-page.component').then((m) => m.HomePageComponent),
  },
];
