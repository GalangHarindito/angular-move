import { createReducer, on } from '@ngrx/store';
import { signUpSuccess, signUpFailure } from '../../action/signup.action';

export interface SignUpState {
  message: string | null;
  error: any;
}

export const initialState: SignUpState = {
  message: null,
  error: null
};

export const signupReducer = createReducer(
  initialState,
  on(signUpSuccess, (state, { message }) => ({
    ...state,
    message,
    error: null
  })),
  on(signUpFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
