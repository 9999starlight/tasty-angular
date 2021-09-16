import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { usersUrl } from 'src/app/apiData';
import jwt_decode from 'jwt-decode';
// import interface
import {
  LoginCredentials,
  RegisterCredentials,
  UserResponse,
  CurrentUser,
  UpdatedUser
} from 'src/app/types/userTypes';
import { BehaviorSubject } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLogged$ = new BehaviorSubject<any | null>(null);
  currentUser$ = new BehaviorSubject<CurrentUser | UpdatedUser | null>(null);

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    const decodedToken: CurrentUser | null = !token ? null : jwt_decode(token);
    this.isLogged$.next(!!token);
    this.currentUser$.next(decodedToken);
  }

  login(credentials: LoginCredentials) {
    return this.http.post<UserResponse>(`${usersUrl}/login`, credentials).pipe(
      tap(({ token }) => {
        this.authHelper(token);
      })
    );
  }

  register(credentials: RegisterCredentials) {
    return this.http
      .post<UserResponse>(`${usersUrl}/register`, credentials)
      .pipe(
        tap(({ token }) => {
          this.authHelper(token);
        })
      );
  }

  signout() {
    localStorage.removeItem('token');
    this.isLogged$.next(false);
    this.currentUser$.next(null);
  }

  authHelper(authToken: string) {
    localStorage.setItem('token', authToken);
    this.isLogged$.next(true);
    const decodedToken: CurrentUser | null = jwt_decode(authToken);
    this.currentUser$.next(decodedToken);
    //console.log('log from login service: ', jwt_decode(authToken))
  }

  updateFavorites(id: {}) {
    console.log('from service update favorites: ', id)
    return this.http.patch<{ message: string, updatedUser: UpdatedUser }>(`${usersUrl}/favorites/${this.currentUser$.value?.userId}`, id).pipe(
      map(updated => {
        this.currentUser$.next(updated.updatedUser);
        return updated.message
      })
    )
  }

  get user(): CurrentUser | UpdatedUser | null {
    return this.currentUser$.value
  }

  get isLogged(): any {
    return this.isLogged$.value
  }

}
