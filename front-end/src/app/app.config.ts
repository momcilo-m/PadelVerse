import { ApplicationConfig, isDevMode, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import {provideStoreDevtools} from "@ngrx/store-devtools"
import { provideEffects } from '@ngrx/effects';
import { UserEffect } from './store/effects/user.effect';
import { userReducer } from './store/reducers/user.reducer';
import { requestReducer } from './store/reducers/request.reducer';
import { complexReducer } from './store/reducers/complex.reducers';
import { ComplexEffect } from './store/effects/complex.effect';
import { weatherReducer } from './store/reducers/weather.reducer';
import { WeatherEffect } from './store/effects/weather.effect';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    provideStore({
      userStatus:userReducer,
      requestStatus:requestReducer,
      complexStatus:complexReducer,
      weatherStatus:weatherReducer
    }),
    provideStoreDevtools({maxAge:25,logOnly:!isDevMode()}),
    provideEffects(UserEffect,ComplexEffect,WeatherEffect),
]
};
