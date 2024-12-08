import { createAction, props } from '@ngrx/store';


export const signUp = createAction(
  '[SignUp] Sign Up',
  props<{ email: string; password: string, firstName: string, lastName: string, consentSignUp: boolean }>()
);
export const signUpSuccess = createAction(
  '[SignUp] Sign In Success',
  props<{ message: string }>()
);
export const signUpFailure = createAction(
  '[SignUp] Sign Up Failure',
  props<{ error: any }>()
);
export const showLoading = createAction('[Loading] Show');
export const hideLoading = createAction('[Loading] Hide');