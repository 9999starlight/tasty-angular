import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { AdminFacade } from '../facade/admin.facade';
import { combineLatest, filter, map, take, tap } from 'rxjs';

export const adminUsersResolver: ResolveFn<boolean> = (route, state) => {
  const adminFacade = inject(AdminFacade);
  return combineLatest([
    adminFacade.usersCount$,
    adminFacade.loading$,
    adminFacade.error$,
  ]).pipe(
    tap(([count, loading]) => {
      if(count === 0 && !loading){
        adminFacade.loadUsers$();
      }
    }),
    filter(([count, loading, error]) => (count > 0 && !loading) || (!!error && !loading)),
    take(1),
    map(() => true),
  );
};
