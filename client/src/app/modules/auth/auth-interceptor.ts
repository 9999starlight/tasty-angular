import { Injectable, inject } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { pipe } from 'rxjs';
@Injectable()

export class AuthInterceptor implements HttpInterceptor {
    private authService = inject(AuthService);

    /* intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const userToken = localStorage.getItem('token');
        if (userToken) {
            const cloned = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + userToken)
            });
            console.log('from interceptor:', req)
            return next.handle(cloned);
        }
        else {
            return next.handle(req);
        }
    } */
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const userToken = localStorage.getItem('token');
        req = req.clone({
            setHeaders: {
                Authorization: `Bearer ${userToken}`
            }
        });
        return next.handle(req).pipe(
            catchError(
                (err) => {
                    if (err.status === 401 && err.error.message === 'Unauthorized access or invalid token!') {
                        console.log(err.error.message)
                        //console.log(err)
                        this.authService.signout();
                        return of(err);
                    }
                    throw err;
                }
            )
        );
    }
}



