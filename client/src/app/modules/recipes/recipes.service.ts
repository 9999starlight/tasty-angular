import { Injectable } from '@angular/core';
import { recipesUrl } from 'src/app/apiData';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { RecipesResponse } from 'src/app/types/recipesTypes';
import { SingleRecipe } from 'src/app/types/SingleRecipe';


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

  getSingleRecipe(id:string) {
    return this.http.get<SingleRecipe>(`${recipesUrl}/${id}`)
  }
}
