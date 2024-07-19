export type InputModel = {
  label: string;
  name: string;
  placeholder: string;
  helpers: string;
};

export interface ButtonSignUp {
    label: string;
    type: string;
    disabled: boolean;
}

export interface SignUpForm {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface CheckBoxConsent {
    name: string;
    disabled: boolean;
}
