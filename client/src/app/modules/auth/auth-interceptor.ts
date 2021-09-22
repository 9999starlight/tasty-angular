import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { pipe } from 'rxjs';
@Injectable()

export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }
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
                Authorization: `Bearer ${userToken}`,
                'Content-Type': 'application/json'
            }
        });
        return next.handle(req).pipe(
            catchError(
                (err) => {
                    if (err.status === 401) {
                        console.log(err.error.message)
                        this.authService.signout();
                        return of(err);
                    }
                    throw err;
                }
            )
        );
    }
}



