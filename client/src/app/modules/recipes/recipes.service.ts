import { Injectable } from '@angular/core';
import { recipesUrl } from 'src/app/apiData';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { RecipesResponse } from 'src/app/types/recipesTypes';
import { RecipeResponse } from 'src/app/types/RecipeResponse';


@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  constructor(private http: HttpClient) { }

  getRecipes() {
    return this.http.get<RecipesResponse>(recipesUrl).pipe(
      map(val => val.response.recipes)
    )
  }

  getLatestRecipes() {
    return this.http.get<RecipesResponse>(recipesUrl, {
      params: { sort: '-createdAt' }
    }).pipe(
      map(val => val.response.recipes)
    )
  }
}
