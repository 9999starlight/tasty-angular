import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, take } from 'rxjs';
import { AuthFacade } from '../facade/auth.facade';

export const authGuard: CanActivateFn = (route, state) => {
  const authFacade = inject(AuthFacade);
  const router = inject(Router);

  authFacade.initFromStorage$();

  return authFacade.isLogged$.pipe(
      take(1),
      map((isLoggedIn) => (isLoggedIn ? true : router.createUrlTree(['/login'])))
    );
};


