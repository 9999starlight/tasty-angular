import { Injectable, inject } from '@angular/core';
import { Route, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take, skipWhile, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {
  private authService = inject(AuthService);
  private router = inject(Router);

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.isLogged$.pipe(
      skipWhile(value => value === null),
      take(1),
      tap((isLoggedIn) => {
        if(!isLoggedIn) {
          this.router.navigateByUrl('')
        }
      })
    );
  }
}
