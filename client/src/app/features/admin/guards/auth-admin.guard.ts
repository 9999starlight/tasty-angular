import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { combineLatest, filter, map, take } from 'rxjs';
import { UserFacade } from '../../user/facade/user.facade';

export const authAdminGuard: CanActivateFn = (route, state) => {
  const userFacade = inject(UserFacade);
  const router = inject(Router);

  userFacade.initFromStorage$();

  return combineLatest([userFacade.currentUser$, userFacade.loading$]).pipe(
    filter(([, loading]) => !loading),
    take(1),
    map(([user]) => (user?.isAdmin ? true : router.createUrlTree(['/'])))
  );
};
