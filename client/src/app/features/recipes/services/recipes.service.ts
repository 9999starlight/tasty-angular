import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RecipesResponse } from '../models/recipes.model';
import { baseUrl, endpoints } from '../../../core/constants/paths/urls';
import { SingleRecipe } from '../models/single-recipe.model';
import { SearchParams } from '../../../shared/components/models/search.model';
import { UpdatedUser } from '../../user/models/userTypes';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  private http = inject(HttpClient);

  // GET
  getRecipes(options?: SearchParams) {
    let params = new HttpParams();

    Object.entries(options ?? {}).forEach(([key, value]) => {
      if (value === undefined || value === null || value === '') {
        return;
      }

      if (Array.isArray(value)) {
        value
          .map((item) => String(item).trim())
          .filter(Boolean)
          .forEach((item) => {
            params = params.append(key, item);
          });
        return;
      }

      params = params.set(key, String(value));
    });

    return this.http.get<RecipesResponse>(`${baseUrl}${endpoints.recipesUrl}`, {
      params,
    });
  }

  getSingleRecipe(id: string) {
    return this.http.get<SingleRecipe>(`${baseUrl}${endpoints.recipesUrl}/${id}`);
  }

  // POST
  createRecipe(recipeData: any) {
    return this.http.post<{ message: string; createdRecipe: SingleRecipe; updatedUser: UpdatedUser }>(
      `${baseUrl}${endpoints.recipesUrl}`,
      recipeData,
    );
  }

  // PATCH/PUT
  updateRecipe(id: string, recipeData: any) {
    return this.http.patch<{ message: string; updatedRecipe: SingleRecipe }>(
      `${baseUrl}${endpoints.recipesUrl}/${id}`,
      recipeData,
    );
  }

  updateRating(id: string, userRate: number) {
    return this.http.patch<{ message: string; summedRating: unknown }>(
      `${baseUrl}${endpoints.recipesUrl}/rate/${id}`,
      { rate: userRate },
    );
  }
}
