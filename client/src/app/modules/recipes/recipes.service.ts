import { Injectable } from '@angular/core';
import { recipesUrl } from 'src/app/apiData';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
//import { RecipesResponse, Rate, Recipe } from 'src/app/types/recipesTypes';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  constructor(private http: HttpClient) { }

  getRecipes() {
    return this.http.get<any>(recipesUrl).pipe(
      map(res => console.log(res))
    )
  }
}
