import { createAction, props } from '@ngrx/store';
import { Session } from '../../service/signin/model';

export const signIn = createAction(
  '[Auth] Sign In',
  props<{ email: string; password: string }>()
);
export const signInSuccess = createAction(
  '[Auth] Sign In Success',
  props<{ access_token: string; refresh_token: string; session: Session }>()
);
export const signInFailure = createAction(
  '[Auth] Sign In Failure',
  props<{ error: any }>()
);
export const showLoading = createAction('[Loading] Show');
export const hideLoading = createAction('[Loading] Hide');
