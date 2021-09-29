import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminGuard implements CanLoad {
  constructor(private authService: AuthService, private router: Router) { }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //return true;
    if (this.authService.isLogged) {
      //const userRole = this.authService.getRole();
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

