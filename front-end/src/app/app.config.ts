import { ApplicationConfig, ErrorHandler, isDevMode, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from "@ngrx/store-devtools"
import { provideEffects } from '@ngrx/effects';
import { UserEffect } from './store/effects/user.effect';
import { userReducer } from './store/reducers/user.reducer';
import { requestReducer } from './store/reducers/request.reducer';
import { complexReducer } from './store/reducers/complex.reducers';
import { ComplexEffect } from './store/effects/complex.effect';
import { weatherReducer } from './store/reducers/weather.reducer';
import { WeatherEffect } from './store/effects/weather.effect';
import { SimpleErrorHandler } from './handler/error.handler';
import { courtReducer } from './store/reducers/court.reducers';
import { matchReducers } from './store/reducers/match.reducers';
import { MatchEffect } from './store/effects/match.effect';
import { SocketService } from './services/socket.service';
import { eventReducer } from './store/reducers/events.reducer';
import { chatReducer } from './store/reducers/chat.reducer';
import { ChatEffect } from './store/effects/chat.effect';
//import { AuthInterceptor } from './interceptor/auth.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    provideStore({
      userStatus: userReducer,
      requestStatus: requestReducer,
      complexStatus: complexReducer,
      weatherStatus: weatherReducer,
      courtStatus: courtReducer,
      matchStatus: matchReducers,
      eventStatus: eventReducer,
      chatStatus: chatReducer
    }),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode(), trace: true }),
    provideEffects(UserEffect, ComplexEffect, WeatherEffect, MatchEffect,ChatEffect),
    { provide: ErrorHandler, useClass: SimpleErrorHandler },
    { provide: SocketService, useClass: SocketService }
    //{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ]
};
