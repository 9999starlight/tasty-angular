import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommentPost, Comment } from 'src/app/types/Comment';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private http = inject(HttpClient);


  postComment(comment: CommentPost) {
    console.log('Request body service: ', comment)
    return this.http.post<{ message: string, createdComment: Comment }>(environment.commentsUrl, comment).pipe(
      map((res) => res.message),
      catchError((err) => {
        console.log(err.error.error)
        return throwError(err);
      })
    );
  }
}
