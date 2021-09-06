import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { OverviewComponent } from './overview/overview.component';
import { UsersComponent } from './users/users.component';
import { RecipesComponent } from './recipes/recipes.component';
import { CommentsComponent } from './comments/comments.component';

const routes: Routes = [
  {
    path: '',
    component: AdminHomeComponent,
    children: [
        {
          path: 'users',
          component: UsersComponent
        },
        {
          path: 'recipes',
          component: RecipesComponent
        },
        {
          path: 'comments',
          component: CommentsComponent
        },
        {
          path: '',
          component: OverviewComponent
        }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
