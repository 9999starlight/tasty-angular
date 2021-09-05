import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateRecipeComponent } from './create-recipe/create-recipe.component';
import { SavedRecipesComponent } from './saved-recipes/saved-recipes.component';
import { UserHomeComponent} from './user-home/user-home.component';
import { UserRecipesComponent } from './user-recipes/user-recipes.component';

const routes: Routes = [
    {
      path: '',
      component: UserHomeComponent
    },
    {
      path: 'user-recipes',
      component: UserRecipesComponent
    },
    {
      path: 'create-recipe',
      component: CreateRecipeComponent
    },
    {
      path: 'saved-recipes',
      component: SavedRecipesComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
