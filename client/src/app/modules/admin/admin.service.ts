import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { CurrentUser, UpdatedUser } from 'src/app/types/userTypes';
import { Comment } from 'src/app/types/Comment';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private http = inject(HttpClient);


  // GET
  getUsers() {
    return this.http
      .get<{ response: { users: UpdatedUser[]; count: number } }>(environment.usersUrl)
      .pipe(
        map((res) => {
          return res.response.users;
        }),
        catchError((err) => {
          console.log(err);
          return throwError(err);
        })
      );
  }

  getUser(id: string) {
    return this.http.get<any>(`${environment.usersUrl}/${id}`).pipe(
      map((res) => {
        return res;
      }),
      catchError((err) => {
        console.log(err);
        return throwError(err);
      })
    );
  }

  getComments() {
    return this.http
      .get<{ response: { comments: Comment[] } }>(environment.commentsUrl)
      .pipe(
        map((res) => {
          return res.response.comments;
        }),
        catchError((err) => {
          console.log(err);
          return throwError(err);
        })
      );
  }

  // PATCH
  // change user status or change admin status
  patchUser(userId: string, change: string, payload: object) {
    return this.http
      .patch<{ message: string }>(`${environment.usersUrl}/${change}/${userId}`, payload)
      .pipe(
        tap((res) => res),
        catchError((err) => {
          console.log(err);
          return throwError(err);
        })
      );
  }

  // DELETE
  deleteComment(id: string) {
    return this.http.delete<any>(`${environment.commentsUrl}/${id}`).pipe(
      map((res) => {
        return res;
      }),
      catchError((err) => {
        console.log(err);
        return throwError(err);
      })
    );
  }
}
