import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';






const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./admin-home/admin-home.component').then(m => m.AdminHomeComponent),
    children: [
        {
          path: 'users',
          loadComponent: () => import('./users/users.component').then(m => m.UsersComponent)
        },
        {
          path: 'recipes',
          loadComponent: () => import('./recipes/recipes.component').then(m => m.RecipesComponent)
        },
        {
          path: 'comments',
          loadComponent: () => import('./comments/comments.component').then(m => m.CommentsComponent)
        },
        {
          path: '',
          loadComponent: () => import('./overview/overview.component').then(m => m.OverviewComponent)
        }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
