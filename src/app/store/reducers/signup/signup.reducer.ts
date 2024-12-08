import { createReducer, on } from '@ngrx/store';
import { signUpSuccess, signUpFailure } from '../../action/signup.action';

export interface SignUpState {
  message: string | null;
}

export const initialState: SignUpState = {
  message: null
};

export const signupReducer = createReducer(
  initialState,
  on(signUpSuccess, (state, { message }) => ({
    ...state,
    message
  })),
  on(signUpFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
