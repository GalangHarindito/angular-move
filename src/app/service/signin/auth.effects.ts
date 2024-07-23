import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CookieService } from 'ngx-cookie-service';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { hideLoading, showLoading, signIn, signInFailure, signInSuccess } from '../../store/action/auth.action';
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
        this.http.post<any>('https://api.escuelajs.co/api/v1/auth/login', { email, password }).pipe(
          map(({ access_token, refresh_token }) => signInSuccess({ access_token, refresh_token })),
          catchError((error) => of(signInFailure({ error }))),
          tap(() => this.store.dispatch(hideLoading()))
        )
      )
    )
  );

  loginSuccess$ = createEffect(() => 
    this.actions$.pipe(
        ofType(signInSuccess),
        tap(({access_token, refresh_token}) => {
            this.cookiesService.set('session', access_token, undefined, '/')
            this.cookiesService.set('refresh', refresh_token, undefined, '/')
            this.router.navigate(['/profile'])
        })
    ),
    { dispatch: false}
)
}
