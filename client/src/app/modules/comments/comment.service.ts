import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommentPost, Comment } from 'src/app/types/Comment';
import { commentsUrl } from 'src/app/apiData';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  postComment(comment: CommentPost) {
    console.log('Request body service: ', comment)
    return this.http.post<{ message: string, createdComment: Comment }>(commentsUrl, comment).pipe(
      map((res) => res.message),
      catchError((err) => {
        console.log(err.error.error)
        return throwError(err);
      })
    );
  }
}
