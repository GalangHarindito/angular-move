import { AuthState } from "../store/reducers/auth.reducer";

export interface AppState {
  auth: AuthState;
  loading: boolean;
  error: any;
}