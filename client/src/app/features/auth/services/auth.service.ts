import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { LoginCredentials, AuthResponse } from '../../user/models/userTypes';
import { baseUrl, endpoints } from '../../../core/constants/paths/urls';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  constructor() {}

  login(credentials: LoginCredentials): Observable<string | null>  {
    return this.http.post<AuthResponse>(`${baseUrl}${endpoints.users.baseUrl}${endpoints.users.login}`, credentials).pipe(
      map(({ token }) => this.authHelper(token))
    );
  }

  register(credentials: LoginCredentials | FormData): Observable<string | null> {
    return this.http
      .post<AuthResponse>(`${baseUrl}${endpoints.users.baseUrl}${endpoints.users.register}`, credentials)
      .pipe(
        map(({ token }) => this.authHelper(token))
      );
  }

  signout() {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExp');
    this.router.navigateByUrl('login');
  }

  authHelper(authToken: string): string | null {
    localStorage.setItem('token', authToken);
    return authToken;
  }
}
