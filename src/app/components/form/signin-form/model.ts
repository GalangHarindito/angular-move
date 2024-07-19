export interface SignInModel {
  email: string;
  password: string;
}

export interface SignInFormModel {
  label: string;
  name: string;
  placeholder: string;
  helpers?: string;
}

export interface ButtonSignIn {
    label: string;
    type: string;
    disabled: boolean;
}
