import { Injectable, inject } from '@angular/core';
import { Route, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminGuard  {
  private authService = inject(AuthService);
  private router = inject(Router);

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //return true;
    if (this.authService.isLogged) {
      if (!this.authService.user?.isAdmin) {
        this.router.navigate(['']);
        return false;
      }
      return true;
    }

    this.router.navigate(['']);
    return false;
  }
}

