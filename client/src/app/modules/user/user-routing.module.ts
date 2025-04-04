import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';





const routes: Routes = [
    {
      path: '',
      loadComponent: () => import('./user-home/user-home.component').then(m => m.UserHomeComponent)
    },
    {
      path: 'user-recipes',
      loadComponent: () => import('./user-recipes/user-recipes.component').then(m => m.UserRecipesComponent)
    },
    {
      path: 'create-recipe',
      loadComponent: () => import('./create-recipe/create-recipe.component').then(m => m.CreateRecipeComponent)
    },
    {
      path: 'saved-recipes',
      loadComponent: () => import('./saved-recipes/saved-recipes.component').then(m => m.SavedRecipesComponent)
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
