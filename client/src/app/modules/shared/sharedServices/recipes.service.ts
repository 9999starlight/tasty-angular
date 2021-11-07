import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { RecipesResponse } from 'src/app/types/recipesTypes';
import { SingleRecipe } from 'src/app/types/SingleRecipe';
import { BehaviorSubject } from 'rxjs';
import { RecipeResponse } from 'src/app/types/RecipeResponse';
import { UpdatedUser } from 'src/app/types/userTypes';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  recipesList$ = new BehaviorSubject<any>(null);
  singleRecipe$ = new BehaviorSubject<any>(null);
  constructor(private http: HttpClient) {}

  // GET requests

  getRecipes() {
    return this.http.get<RecipesResponse>(environment.recipesUrl).pipe(
      map((val) => {
        return val.response.recipes;
      }),
      catchError((err) => {
        console.log(err);
        return throwError(err);
      })
    );
  }

  getRecipesByQuery(options: any) {
    //console.log('options from service: ',options)
    return this.http
      .get<RecipesResponse>(environment.recipesUrl, {
        params: options,
      })
      .pipe(
        map((val) => {
          this.recipesList$.next(val.response.recipes);
          return this.recipesList;
        }),
        catchError((err) => {
          console.log(err);
          return throwError(err);
        })
      );
  }

  // error handled with redirect in resolver
  getSingleRecipe(id: string) {
    const recipe = this.http.get<SingleRecipe>(
      `${environment.recipesUrl}/${id}`
    );
    this.singleRecipe$.next(recipe);
    //console.log('recipe from service: ', this.singleRecipe$.value)
    return this.singleRecipe$.value;
  }

  // POST
  createRecipe(recipeData: any) {
    //console.log('data sent by service', recipeData)
    return this.http
      .post<{ message: string; createdRecipe: SingleRecipe }>(
        environment.recipesUrl,
        recipeData
      )
      .pipe(
        map((res) => {
          this.singleRecipe$.next(res.createdRecipe);
          return res;
        }),
        catchError((err) => {
          console.log(err);
          return throwError(err);
        })
      );
  }

  // PATCH/PUT requests
  updateRecipe(id: string, recipeData: any) {
    return this.http
      .patch<{ message: string; updatedRecipe: SingleRecipe }>(
        `${environment.recipesUrl}/${id}`,
        recipeData
      )
      .pipe(
        map((res) => {
          this.singleRecipe$.next(res.updatedRecipe);
          return res;
        }),
        catchError((err) => {
          console.log(err);
          return throwError(err);
        })
      );
  }

  updateRating(id: string, userRate: number) {
    console.log('from service: ', id, userRate);
    const updatedRating = this.http.patch<SingleRecipe>(
      `${environment.recipesUrl}/rate/${id}`,
      { rate: userRate }
    );
    this.singleRecipe$.next(updatedRating);
    return this.singleRecipe$.value;
  }

  // DELETE
  deleteRecipe(id: string) {
    return this.http
      .delete<{ message: string; userUpdate: UpdatedUser }>(
        `${environment.recipesUrl}/${id}`
      )
      .pipe(
        map((res) => {
          return res;
        }),
        catchError((err) => {
          console.log(err);
          return throwError(err);
        })
      );
  }

  // Getters
  get recipesList(): RecipeResponse[] {
    return this.recipesList$.value;
  }

  get singleRecipe(): SingleRecipe {
    return this.singleRecipe$.value;
  }
}
