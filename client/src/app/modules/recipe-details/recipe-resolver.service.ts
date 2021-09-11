import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { SingleRecipe } from 'src/app/types/SingleRecipe';
import { RecipesService } from '../shared/sharedServices/recipes.service';


@Injectable({
  providedIn: 'root'
})
export class RecipeResolverService implements Resolve<SingleRecipe> {

  constructor(private recipesService: RecipesService) {}

  resolve(route: ActivatedRouteSnapshot) {
    const { id } = route.params;
    // console.log('from resolver: ', this.recipesService.getSingleRecipe(id))
    return this.recipesService.getSingleRecipe(id)
  }
}
