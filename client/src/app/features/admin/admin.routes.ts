import { Routes } from '@angular/router';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/admin-home/admin-home.component').then((m) => m.AdminHomeComponent),
    children: [
              {
          path: 'users',
          loadComponent: () => import('./components/users/users.component').then(m => m.UsersComponent)
        },
        {
          path: 'recipes',
          loadComponent: () => import('./components/recipes/recipes.component').then(m => m.RecipesComponent)
        },
        {
          path: 'comments',
          loadComponent: () => import('./components/comments/comments.component').then(m => m.CommentsComponent)
        },
        {
          path: '',
          loadComponent: () => import('./components/overview/overview.component').then(m => m.OverviewComponent)
        }
    ]
  },
];


