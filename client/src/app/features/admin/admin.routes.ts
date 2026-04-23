import { Routes } from '@angular/router';
import { adminHomeResolver } from './resolvers/admin-home.resolver';
import { adminUsersResolver } from './resolvers/admin-users.resolver';
import { adminRecipesResolver } from './resolvers/admin-recipes.resolver';
import { adminCommentsResolver } from './resolvers/admin-comments.resolver';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/admin-home/admin-home.component').then((m) => m.AdminHomeComponent),
    resolve: {
      preloadAdminHome: adminHomeResolver,
    },
    children: [
      {
        path: 'users',
        loadComponent: () =>
          import('./components/users/users.component').then((m) => m.UsersComponent),
        resolve: {
          usersLoaded: adminUsersResolver,
        }
      },
      {
        path: 'recipes',
        loadComponent: () =>
          import('./components/recipes/recipes.component').then((m) => m.RecipesComponent),
        resolve: {
          recipesLoaded: adminRecipesResolver,
        }
      },
      {
        path: 'comments',
        loadComponent: () =>
          import('./components/comments/comments.component').then((m) => m.CommentsComponent),
        resolve: {
          commentsLoaded: adminCommentsResolver,
        }
      },
      {
        path: '',
        loadComponent: () =>
          import('./components/overview/overview.component').then((m) => m.OverviewComponent),
      },
    ],
  },
];
