import { Routes } from '@angular/router';
import { guestGuard } from './guards/guest.guard';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    canActivate: [guestGuard],
    loadComponent: () =>
      import('./components/login/login.component').then((m) => m.LoginComponent),
  },
];
