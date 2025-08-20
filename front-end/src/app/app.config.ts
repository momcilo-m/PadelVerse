import { ApplicationConfig, isDevMode, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import {provideStoreDevtools} from "@ngrx/store-devtools"
import { provideEffects } from '@ngrx/effects';
import { UserEffect } from './store/effects/user.effect';
import { userReducer } from './store/reducers/user.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    provideStore({
      userStatus:userReducer
    }),
    provideStoreDevtools({maxAge:25,logOnly:!isDevMode()}),
    provideEffects(UserEffect),
]
};
