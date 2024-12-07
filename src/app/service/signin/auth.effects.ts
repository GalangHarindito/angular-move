import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CookieService } from 'ngx-cookie-service';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { asyncScheduler, of, scheduled } from 'rxjs';
import {
  hideLoading,
  showLoading,
  signIn,
  signInFailure,
  signInSuccess,
} from '../../store/action/auth.action';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  constructor(
    private http: HttpClient,
    private store: Store,
    private actions$: Actions,
    private cookiesService: CookieService,
    private router: Router
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signIn),
      tap(() => this.store.dispatch(showLoading())),
      switchMap(({ email, password }) =>
        this.http
          .post<any>('http://localhost:3000/api/auth/signin', {
            email,
            password,
          })
          .pipe(
            map(({ access_token, refresh_token, session }) =>
              signInSuccess({ access_token, refresh_token, session })
            ),
            catchError((error) =>
              scheduled([signInFailure({ error })], asyncScheduler)
            ),
            tap(() => this.store.dispatch(hideLoading()))
          )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(signInSuccess),
        tap(({ access_token, refresh_token, session }) => {
          this.cookiesService.set('token', access_token, undefined, '/');
          this.cookiesService.set('refresh_token', refresh_token, undefined, '/');
          this.cookiesService.set('session', JSON.stringify(session), undefined, '/')
          this.router.navigate(['/profile']);
        })
      ),
    { dispatch: false }
  );
}
