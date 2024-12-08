import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './service/interceptor/auth/auth.interceptor';
import { errorInterceptor } from './service/error/error.interceptor';
import { CookieService } from 'ngx-cookie-service';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { AuthEffects } from './service/signin/auth.effects';
import { authReducer } from './store/reducers/auth.reducer';
import { loadingReducer } from './store/reducers/loading.reducer';
import { profileReducer } from './store/reducers/profile/profile.reducer';
import { ProfileEffects } from './service/profile/profile.effect';
import { signupReducer } from './store/reducers/signup/signup.reducer';
import { SignupEffects } from './service/signup/signup.effects';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch(),  withInterceptors([errorInterceptor, authInterceptor])),
    CookieService,
    provideStore({
      auth: authReducer,
      loading: loadingReducer,
      profile: profileReducer,
      signup: signupReducer
      // error: errorReducer,
    }),
    provideEffects([AuthEffects, ProfileEffects, SignupEffects]),
    // provideStore({ auth: authReducer, loading: loadingReducer, error: errorReducer }),
    // provideEffects([AuthEffects]),
    // { provide: HTTP_INTERCEPTORS, useValue: authInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useValue: errorInterceptor, multi: true }
    ]
  ,
};
