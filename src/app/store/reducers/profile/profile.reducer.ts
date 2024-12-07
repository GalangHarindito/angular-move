import { createReducer, on } from '@ngrx/store';
import { profileSuccess, profileFailure, showLoading, hideLoading } from '../../action/profile.action';

export interface ProfileState {
  id: number | null;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  error: any;
}

export const initialState: ProfileState = {
  id: null,
  email: null,
  firstName: null,
  lastName: null,
  error: null,
};

export const profileReducer = createReducer(
  initialState,
  on(profileSuccess, (state, { id, email, firstName, lastName }) => ({
    ...state,
    id,
    email,
    firstName,
    lastName,
    error: null,
  })),
  on(profileFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export const initialStateLoading = false;

export const loadingReducer = createReducer(
    initialStateLoading,
    on(showLoading, () => true),
    on(hideLoading, () => false)
)
