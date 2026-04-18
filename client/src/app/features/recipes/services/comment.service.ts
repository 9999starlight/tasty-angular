import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RecipeComment, CommentPost } from '../models/comment.model';
import { baseUrl, endpoints } from '../../../core/constants/paths/urls';


@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private http = inject(HttpClient);

  postComment(comment: CommentPost) {
    return this.http.post<{ message: string, createdComment: RecipeComment }>(`${baseUrl}${endpoints.commentsUrl}`, comment)
  }
}
