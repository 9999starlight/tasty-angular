import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { commentsUrl, usersUrl } from 'src/app/apiData';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { CurrentUser, UpdatedUser } from 'src/app/types/userTypes';
import { Comment } from 'src/app/types/Comment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  // GET
  getUsers() {
    return this.http.get<{ response: { users: UpdatedUser[], count: number } }>(usersUrl).pipe(
      map(res => {
        return res.response.users;
      }),
      catchError((err) => {
        console.log(err)
        return throwError(err);
      })
    )
  }

  getUser(id: string) {
    return this.http.get<any>(`${usersUrl}/${id}`).pipe(
      map(res => {
        return res;
      }),
      catchError((err) => {
        console.log(err)
        return throwError(err);
      })
    )
  }

  getComments() {
    return this.http.get<{ response: { comments: Comment[] } }>(commentsUrl).pipe(
      map(res => {
        return res.response.comments;
      }),
      catchError((err) => {
        console.log(err)
        return throwError(err);
      })
    )
  }

  deleteComment(id: string) {
    return this.http.delete<any>(`${commentsUrl}/${id}`).pipe(
      map(res => {
        return res
      }),
      catchError((err) => {
        console.log(err)
        return throwError(err);
      })
    )
  }


}
