import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authservice = inject(AuthService);
  const userToken = localStorage.getItem('token');
  req = req.clone({
    setHeaders: {
      Authorization: `Bearer ${userToken}`,
    },
  });
  return next(req).pipe(
    catchError((err) => {
      if (err.status === 401 && err.error.message === 'Unauthorized access or invalid token!') {
        authservice.signout();
      }
      return throwError(() => err);
    }),
  );
};
