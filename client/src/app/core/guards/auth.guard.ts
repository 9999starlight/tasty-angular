import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  // TODO: inject your AuthService and check if the user is logged in
  // const authService = inject(AuthService);
  // if (authService.isLoggedIn()) return true;
  // return inject(Router).createUrlTree(['/login']);
  return true;
};
