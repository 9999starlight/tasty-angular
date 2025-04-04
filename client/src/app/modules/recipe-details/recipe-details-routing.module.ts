import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeResolverService } from './recipe-resolver.service';


const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./recipe/recipe.component').then(m => m.RecipeComponent),
        resolve: {
            recipe: RecipeResolverService
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RecipeDetailsRoutingModule { }