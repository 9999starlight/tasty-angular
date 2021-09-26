import { Injectable } from '@angular/core';
import { recipesUrl } from 'src/app/apiData';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { RecipesResponse } from 'src/app/types/recipesTypes';
import { SingleRecipe } from 'src/app/types/SingleRecipe';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  recipesList$ = new BehaviorSubject<any>(null);
  singleRecipe$ = new BehaviorSubject<any>(null);
  constructor(private http: HttpClient) { }

  // GET requests

  getRecipes() {
    return this.http.get<RecipesResponse>(recipesUrl).pipe(
      map(val => {
        return val.response.recipes;
      }),
      catchError((err) => {
        console.log(err)
        return throwError(err);
      })
    )
  }

  getRecipesByQuery(options: {}) {
    return this.http.get<RecipesResponse>(recipesUrl, {
      params: options
    }).pipe(
      map(val => {
        this.recipesList$.next(val.response.recipes);
        return this.recipesList;
      }),
      catchError((err) => {
        console.log(err)
        return throwError(err);
      })
    )
  }

  // error handled with redirect in resolver
  getSingleRecipe(id: string) {
    const recipe = this.http.get<SingleRecipe>(`${recipesUrl}/${id}`);
    this.singleRecipe$.next(recipe);
    //console.log('recipe from service: ', this.singleRecipe$.value)
    return this.singleRecipe$.value;
  }

  // PATCH requests
  /* updateRecipe(id: string, par: {}) {
    return this.http.patch<SingleRecipe>(`${recipesUrl}/${id}`,{ par }).pipe(
        catchError(err => {
          console.log(err);
          return throwError(err);
        })
      );
  } */

  updateRating(id: string, userRate: number) {
    console.log('from service: ', id, userRate)
    const updatedRating = this.http.patch<SingleRecipe>(`${recipesUrl}/rate/${id}`, { rate: userRate })
    this.singleRecipe$.next(updatedRating);
    return this.singleRecipe$.value; 
  }

  get recipesList(): any {
    return this.recipesList$.value;
  }

  get singleRecipe(): any {
    return this.singleRecipe$.value;
  }
}
