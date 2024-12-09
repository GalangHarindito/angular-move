import { AuthState } from "../store/reducers/auth.reducer";
import { ProfileState } from "../store/reducers/profile/profile.reducer";
import { SignUpState } from "../store/reducers/signup/signup.reducer";

export interface AppState {
  auth: AuthState;
  loading: boolean;
  error: any;
}


export interface UserProfileState {
  profile: ProfileState;
  loading: boolean;
  error: any;
}

export interface UserSignUpState {
  signup: SignUpState;
  loading: boolean;
  error: any;
}