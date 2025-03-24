import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { SingleRecipe } from 'src/app/types/SingleRecipe';
import { RecipesService } from '../shared/sharedServices/recipes.service';
import { map, catchError } from 'rxjs/operators'; 


@Injectable({
  providedIn: 'root'
})
export class RecipeResolverService  {

  constructor(private recipesService: RecipesService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot) {
    const { id } = route.params;
    
    return this.recipesService.getSingleRecipe(id).pipe(
      catchError(() => {
        this.router.navigateByUrl('not-found')
        return EMPTY;
      })
    )
  }
}
 