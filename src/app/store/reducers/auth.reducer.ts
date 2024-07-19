import { createReducer, on } from '@ngrx/store';
import { signInSuccess, signInFailure } from '../action/auth.action';

export interface AuthState {
  access_token: string | null;
  refresh_token: string | null;
  error: any;
}

export const initialState: AuthState = {
  access_token: null,
  refresh_token: null,
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(signInSuccess, (state, { access_token, refresh_token }) => ({
    ...state,
    access_token,
    refresh_token,
    error: null,
  })),
  on(signInFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
