import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import jwt_decode from 'jwt-decode';
// import interface
import {
  LoginCredentials,
  RegisterCredentials,
  UserResponse,
  CurrentUser,
  UpdatedUser
} from 'src/app/types/userTypes';
import { BehaviorSubject, throwError } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  isLogged$ = new BehaviorSubject<any | null>(null);
  currentUser$ = new BehaviorSubject<CurrentUser | UpdatedUser | null>(null);

  constructor() {
    const token = localStorage.getItem('token');
    const decodedToken: CurrentUser | null = !token ? null : jwt_decode(token);
    this.isLogged$.next(!!token);
    this.currentUser$.next(decodedToken);
  }

  login(credentials: LoginCredentials) {
    return this.http.post<UserResponse>(`${environment.usersUrl}/login`, credentials).pipe(
      tap(({ token }) => {
        this.authHelper(token);
      }),
      catchError((err) => {
        console.log(err)
        return throwError(err);
      })
    );
  }

  register(credentials: any) {
    return this.http
      .post<UserResponse>(`${environment.usersUrl}/register`, credentials)
      .pipe(
        tap(({ token }) => {
          this.authHelper(token);
        }),
        catchError((err) => {
          console.log(err)
          return throwError(err);
        })
      );
  }

  signout() {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExp');
    this.isLogged$.next(false);
    this.currentUser$.next(null);
    this.router.navigateByUrl('login');
  }

  authHelper(authToken: string) {
    localStorage.setItem('token', authToken);
    this.isLogged$.next(true);
    const decodedToken: CurrentUser | null = jwt_decode(authToken);
    this.currentUser$.next(decodedToken);
    //console.log('log from login service: ', jwt_decode(authToken))
  }

  updateFavorites(id: {}) {
    // console.log('from service update favorites: ', id)
    return this.http.patch<{ message: string, updatedUser: UpdatedUser }>(`${environment.usersUrl}/favorites/${this.currentUser$.value?.userId}`, id).pipe(
      map(updated => {
        this.currentUser$.next(updated.updatedUser);
        return updated.message
      }),
      catchError((err) => {
        console.log(err)
        return throwError(err);
      })
    )
  }

  updateUserImage(payload: FormData) {
    return this.http.patch<{ message: string, updatedUser: UpdatedUser }>(`${environment.usersUrl}/${this.currentUser$.value?.userId}`, payload).pipe(
      map(updated => {
        this.currentUser$.next(updated.updatedUser);
        return updated.message
      }),
      catchError((err) => {
        console.log(err)
        return throwError(err);
      })
    )
  }

  deleteFromFavorites(recipeId: string) {
    // console.log('from service update favorites: ', id)
    return this.http.patch<{ message: string, updatedUser: UpdatedUser }>(`${environment.usersUrl}/remove_favorite/${this.currentUser$.value?.userId}`, { favoriteId: recipeId }).pipe(
      map(updated => {
        this.currentUser$.next(updated.updatedUser);
        return updated
      }),
      catchError((err) => {
        console.log(err)
        return throwError(err);
      })
    )
  }

  updateUser(payload: UpdatedUser) {
    console.log('payload for update: ', payload)
    this.currentUser$.next(payload);
    console.log('user after update in service: ', this.user)
  }

  get user() {
    //console.log('user from service getter: ', this.currentUser$.value)
    return this.currentUser$.value
  }

  get isLogged(): boolean {
    return this.isLogged$.value
  }

}
