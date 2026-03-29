import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authAdminGuard: CanActivateFn = (route, state) => {
  // TODO: inject your AuthService and check if the user has admin role
  // const authService = inject(AuthService);
  // if (authService.isAdmin()) return true;
  // return inject(Router).createUrlTree(['/not-found']);
  console.log('authAdminGuard called:', route);
  return true;
};
