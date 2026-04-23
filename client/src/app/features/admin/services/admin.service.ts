import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { baseUrl, endpoints } from '../../../core/constants/paths/urls';
import { UpdatedUser } from '../../user/models/userTypes';
import { RecipeComment } from '../../recipes/models/comment.model';
import { RecipeCommentsResponse } from '../../recipes/models/recipes.model';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private http = inject(HttpClient);

  // GET
  getUsers() {
    return this.http.get<{ response: { users: UpdatedUser[]; }, count: number }>(
      `${baseUrl}${endpoints.users.baseUrl}`,
    );
  }

  getUser(id: string) {
    return this.http.get<UpdatedUser>(`${baseUrl}${endpoints.users.baseUrl}/${id}`);
  }

  getComments() {
    return this.http.get<RecipeCommentsResponse>(
      `${baseUrl}${endpoints.commentsUrl}`,
    );
  }

  // PATCH
  // change user status or change admin status
  patchUser(userId: string, change: string, payload: object) {
    return this.http.patch<{ message: string; updatedUser: UpdatedUser }>(
      `${baseUrl}${endpoints.users.baseUrl}/${change}/${userId}`,
      payload,
    );
  }

  // DELETE
  deleteComment(id: string) {
    return this.http.delete<{ message: string }>(`${baseUrl}${endpoints.commentsUrl}/${id}`);
  }
}
