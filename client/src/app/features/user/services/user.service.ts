import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
import { baseUrl, endpoints } from '../../../core/constants/paths/urls';
import { CurrentUser, UpdatedUser } from '../models/userTypes';

export function getUserFromToken(token: string | null): CurrentUser | null {
  if (!token) {
    return null;
  }

  try {
    return jwtDecode<CurrentUser>(token);
  } catch {
    return null;
  }
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);

  updateFavorites(
    id: {},
    userId: string,
  ): Observable<{ message: string; updatedUser: UpdatedUser }> {
    return this.http.patch<{ message: string; updatedUser: UpdatedUser }>(
      `${baseUrl}${endpoints.users.baseUrl}${endpoints.users.favorites}/${userId}`,
      id,
    );
  }

  updateUserImage(
    payload: FormData,
    userId: string,
  ): Observable<{ message: string; updatedUser: UpdatedUser }> {
    return this.http.patch<{ message: string; updatedUser: UpdatedUser }>(
      `${baseUrl}${endpoints.users.baseUrl}/${userId}`,
      payload,
    );
  }

  deleteFromFavorites(
    recipeId: string,
    userId: string,
  ): Observable<{ message: string; updatedUser: UpdatedUser }> {
    return this.http.patch<{ message: string; updatedUser: UpdatedUser }>(
      `${baseUrl}${endpoints.users.baseUrl}${endpoints.users.removeFavorite}/${userId}`,
      { favoriteId: recipeId },
    );
  }
}
