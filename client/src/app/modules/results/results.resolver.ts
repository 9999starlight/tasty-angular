import { Injectable, inject } from '@angular/core';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { EMPTY } from 'rxjs';
import { RecipesService } from '../shared/sharedServices/recipes.service';
import { catchError } from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})
export class ResultsResolver  {
  private recipesService = inject(RecipesService);
  private router = inject(Router);


  resolve(route: ActivatedRouteSnapshot) {
    const params = route.queryParams;
    // console.log('resolver params: ', params)
    return this.recipesService.getRecipesByQuery(params).pipe(
      catchError(() => {
        this.router.navigateByUrl('not-found')
        return EMPTY;
      })
    )
  }
}
