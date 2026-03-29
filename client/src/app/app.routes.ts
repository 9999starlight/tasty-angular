import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { authAdminGuard } from './features/admin/guards/auth-admin.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./features/auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },

  {
    path: 'admin',
    canActivate: [authGuard, authAdminGuard],
    loadChildren: () =>
      import('./features/admin/admin.routes').then((m) => m.ADMIN_ROUTES),
  },

  {
    path: 'user',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./features/user/user.routes').then((m) => m.USER_ROUTES),
  },

  {
    path: 'recipe/:id',
    data: { search: true },
    loadChildren: () =>
      import('./features/recipes/recipe-details.routes').then(
        (m) => m.RECIPE_DETAILS_ROUTES
      ),
  },

  {
    path: 'recipes',
    data: { search: true },
    loadChildren: () =>
      import('./features/recipes/recipes.routes').then(
        (m) => m.RECIPES_ROUTES
      ),
  },

  {
    path: 'not-found',
    loadComponent: () =>
      import('./features/not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      ),
  },

  {
    path: '',
    data: { search: true },
    loadChildren: () =>
      import('./features/home/home.routes').then((m) => m.HOME_ROUTES),
  },

  {
    path: '**',
    redirectTo: 'not-found',
  },
];
