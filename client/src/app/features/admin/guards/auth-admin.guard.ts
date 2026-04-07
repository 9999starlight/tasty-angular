import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, take } from 'rxjs';
import { UserFacade } from '../../user/facade/user.facade';

export const authAdminGuard: CanActivateFn = (route, state) => {
  const userFacade = inject(UserFacade);
  const router = inject(Router);

  userFacade.initFromStorage$();

  return userFacade.currentUser$.pipe(
    take(1),
    map((user) => (user?.isAdmin ? true : router.createUrlTree(['/'])))
  );
};
