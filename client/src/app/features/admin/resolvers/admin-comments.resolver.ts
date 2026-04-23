import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { AdminFacade } from '../facade/admin.facade';
import { combineLatest, filter, map, take, tap } from 'rxjs';

export const adminCommentsResolver: ResolveFn<boolean> = (route, state) => {
  const adminFacade = inject(AdminFacade);
  return combineLatest([
    adminFacade.commentsCount$,
    adminFacade.loading$,
    adminFacade.error$,
  ]).pipe(
    tap(([count, loading]) => {
      if(count === 0 && !loading){
        adminFacade.loadComments$();
      }
    }),
    filter(([count, loading, error]) => (count > 0 && !loading) || (!!error && !loading)),
    take(1),
    map(() => true),
  );
};
