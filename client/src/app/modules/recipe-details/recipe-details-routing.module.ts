import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeResolverService } from './recipe-resolver.service';
import { RecipeComponent } from './recipe/recipe.component';

const routes: Routes = [
    {
        path: '',
        component: RecipeComponent,
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