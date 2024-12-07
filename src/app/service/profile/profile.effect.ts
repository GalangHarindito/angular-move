import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { asyncScheduler, scheduled } from 'rxjs';

import {
    hideLoading,
  profile,
  profileFailure,
  profileSuccess,
  showLoading,
} from '../../store/action/profile.action';

@Injectable()
export class ProfileEffects {
  constructor(
    private http: HttpClient,
    private store: Store,
    private actions$: Actions,
  ) {}

  profile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(profile),
      tap(() => this.store.dispatch(showLoading())),
      switchMap(() =>
        this.http.get<any>('http://localhost:3000/api/profile').pipe(
          map((response) => profileSuccess(response.data)),
          catchError((error) =>
            scheduled([profileFailure({ error })], asyncScheduler)
          ),
          tap(() => this.store.dispatch(hideLoading()))
        )
      )
    )
  );

  profileSuccess$ = createEffect(
    () =>
        this.actions$.pipe(
          ofType(profileSuccess),
          tap((response) => {
            console.log(response)
            response
          })
        ),
      { dispatch: false }
  );
}
