import { Injectable } from '@angular/core';
import { recipesUrl } from 'src/app/apiData';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { RecipesResponse } from 'src/app/types/recipesTypes';
import { SingleRecipe } from 'src/app/types/SingleRecipe';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  constructor(private http: HttpClient) { }

  // GET requests

  getRecipes(options?: {}) {
    return this.http.get<RecipesResponse>(recipesUrl, options).pipe(
      map(val => val.response.recipes),
      catchError((err) => {
        console.log(err)
        return throwError(err);
      })
    )
  }

  // error handled with redirect in resolver
  getSingleRecipe(id: string) {
    return this.http.get<SingleRecipe>(`${recipesUrl}/${id}`)
  }

  // PATCH requests
  updateRecipe(id: string, par: {}) {
    return this.http.patch<SingleRecipe>(`${recipesUrl}/${id}`, {
      params: {
        par
      }
    }).pipe(
      catchError(err => {
        console.log(err);
        return throwError(err);
      })
    );
  }

  updateRating(id: string, userRate: number) {
    return this.http.patch<SingleRecipe>(`${recipesUrl}/rate/${id}`, {
      params: {
        rate: userRate
      }
    }).pipe(
      catchError(err => {
        console.log(err);
        return throwError(err);
      })
    );
  }

}
