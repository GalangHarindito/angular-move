import { AuthState } from "../store/reducers/auth.reducer";
import { ProfileState } from "../store/reducers/profile/profile.reducer";

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