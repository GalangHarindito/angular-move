import { createAction, props } from '@ngrx/store';

export const profile = createAction('[Profile] Profile');

export const profileSuccess = createAction(
  '[Profile] Profile Success',
  props<{
    id: null;
    email: null;
    password: null;
    firstName: null;
    lastName: null;
  }>()
);

export const profileFailure = createAction(
  '[Profile] Profile Failure',
  props<{ error: any }>()
);

export const showLoading = createAction('[Loading] Show');
export const hideLoading = createAction('[Loading] Hide');
