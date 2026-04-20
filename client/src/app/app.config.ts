import { ApplicationConfig, isDevMode, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './features/auth/interceptors/auth.interceptor';
import { provideStore } from '@ngrx/store';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { authFeature } from './features/auth/store/auth.reducer';
import { AuthEffects } from './features/auth/store/auth.effects';
import { userFeature } from './features/user/store/user.reducer';
import { UserEffects } from './features/user/store/user.effects';
import { recipesFeature } from './features/recipes/store/recipes.reducer';
import { RecipesEffects } from './features/recipes/store/recipes.effects';
import { adminFeature } from './features/admin/store/admin.reducer';
import { AdminEffects } from './features/admin/store/admin.effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
//import { provideAnimations } from '@angular/platform-browser/animations';

const featureStateProviders = [
  provideState(authFeature),
  provideState(userFeature),
  provideState(recipesFeature),
  provideState(adminFeature),
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withViewTransitions({ skipInitialTransition: true })),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideStore(),
    ...featureStateProviders,
    provideEffects([AuthEffects, UserEffects, RecipesEffects, AdminEffects]),
    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
      connectInZone: true, // If set to true, the connection is established within the Angular zone
    })
    //provideAnimations()
  ],
};
