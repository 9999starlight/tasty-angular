import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { usersUrl } from 'src/app/apiData';
import jwt_decode from 'jwt-decode';
// import interface
import {
  LoginCredentials,
  RegisterCredentials,
  userResponse
} from 'src/app/types/userTypes';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLogged$ = new BehaviorSubject<any>(null);
  //token$ = new BehaviorSubject('');
  currentUser$ = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    const decodedToken = !token ? null : jwt_decode(token);
    this.isLogged$.next(!!token);
    this.currentUser$.next(decodedToken);
  }

  login(credentials: LoginCredentials) {
    return this.http.post<userResponse>(`${usersUrl}/login`, credentials).pipe(
      tap(({ token }) => {
        this.authHelper(token);
      })
    );
  }

  register(credentials: RegisterCredentials) {
    return this.http
      .post<userResponse>(`${usersUrl}/register`, credentials)
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
    const decodedToken = jwt_decode(authToken);
    this.currentUser$.next(decodedToken);
    //console.log('log from login service: ', jwt_decode(authToken))
  }
}
