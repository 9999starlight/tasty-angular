import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthGuard } from './modules/auth/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },

  {
    path: 'admin',
    canLoad: [AuthGuard],
    loadChildren: () =>
      import('./modules/admin/admin.module').then((m) => m.AdminModule),
  },

  {
    path: 'user',
    canLoad: [AuthGuard],
    loadChildren: () =>
      import('./modules/user/user.module').then((m) => m.UserModule),
  },

  {
    path: 'recipe/:id',
    loadChildren: () =>
    import('./modules/recipe-details/recipe-details.module').then((m) => m.RecipeDetailsModule)
  },

  {
    path: 'results',
    loadChildren: () =>
    import('./modules/results/results.module').then((m) => m.ResultsModule)
  },

  {
    path: 'not-found',
    component: NotFoundComponent,
  },

  {
    path: '',
    loadChildren: () =>
      import('./modules/home/home.module').then((m) => m.HomeModule),
  },

  {
    path: '**',
    redirectTo: 'not-found'
  },
];

// preload modules for fast availability of lazy loading modules
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, anchorScrolling: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
