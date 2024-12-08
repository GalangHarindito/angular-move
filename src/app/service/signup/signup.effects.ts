import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { asyncScheduler, of, scheduled } from 'rxjs';
import { signUp,signUpFailure, signUpSuccess, showLoading, hideLoading } from '../../store/action/signup.action';
import { Router } from '@angular/router';

@Injectable()
export class SignupEffects {
  constructor(
    private http: HttpClient,
    private store: Store,
    private actions$: Actions,
    private router: Router
  ) {}

  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signUp),
      tap(() => this.store.dispatch(showLoading())),
      switchMap(({ email, password, firstName, lastName,consentSignUp }) =>
        this.http
          .post<any>('http://localhost:3000/api/auth/signup', {
            email,
            password,
            firstName,
            lastName,
            consentSignUp
          })
          .pipe(
            map((response) =>
              signUpSuccess(response.message)
            ),
            catchError((error) =>
              scheduled([signUpFailure({ error })], asyncScheduler)
            ),
            tap(() => this.store.dispatch(hideLoading()))
          )
      )
    )
  );

  signupSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(signUpSuccess),
        tap(() => {
          this.router.navigate(['/signupsuccess']);
        })
      ),
    { dispatch: false }
  );
}
