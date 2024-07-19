import { CommonModule } from '@angular/common';
import { Component, DoCheck, forwardRef } from '@angular/core';
import { InputComponent } from '../../../shared/components/input/input/input.component';
import { InputModel, ButtonSignUp, SignUpForm, CheckBoxConsent } from './model';
import {
  FormBuilder,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { ConfirmPasswordValidator } from '../../../utils/validator';
import { CheckboxComponent } from '../../../shared/components/checkbox/checkbox.component';
import { PasswordComponent } from '../../../shared/components/input/password/password.component';

@Component({
  selector: 'app-signup-form',
  standalone: true,
  imports: [
    CommonModule,
    InputComponent,
    ButtonComponent,
    ReactiveFormsModule,
    CheckboxComponent,
    PasswordComponent
  ],
  templateUrl: './signup-form.component.html',
  styleUrl: './signup-form.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SignupFormComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => SignupFormComponent),
      multi: true,
    },
  ],
})
export class SignupFormComponent {
  signUpForm!: FormGroup;
  errorForm: boolean = false;
  errorMessage: string = '';
  checked: boolean = false;
  buttonDisabled: boolean = true;
  checkBoxDisabled: boolean = true;

  constructor(private formBuilder: FormBuilder) {
    this.signUpForm = this.formBuilder.group(
      {
        firstName: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(50),
          ]),
        ],
        lastName: ['', Validators.required],
        email: [
          '',
          Validators.compose([Validators.required, Validators.email]),
        ],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
        consentSignUp: [{value: this.checked, disabled: true}, Validators.compose([Validators.required])]
        
      },
      { validator: ConfirmPasswordValidator.MatchPassword }
    );
  }

  get value(): SignUpForm {
    return this.signUpForm.value;
  }

  get control() {
    return this.signUpForm.controls;
  }

  ngDoCheck(){
    if( this.signUpForm.status === 'VALID'){
      this.signUpForm.get('consentSignUp')?.enable();
    }else{
      this.signUpForm.get('consentSignUp')?.disable();
      this.buttonDisabled = true
    }
  }

  public inputInformation: InputModel[] = [
    {
      label: 'First Name',
      name: 'firstName',
      placeholder: 'Input First Name',
      helpers: 'Min character 2 & max character 50',
    },
    {
      label: 'Last Name',
      name: 'lastName',
      placeholder: 'Input Last Name',
      helpers: 'Min character 2 & max character 50',
    },
    {
      label: 'Email',
      name: 'email',
      placeholder: 'Input Email',
      helpers: '',
    },
    {
      label: 'Password',
      name: 'password',
      placeholder: 'Input Password',
      helpers:
        "Max 8 character\none special character, number, upper case",
    },
    {
      label: 'Confirm Password',
      name: 'confirmPassword',
      placeholder: 'Input Confirm Password',
      helpers: '',
    },
  ];

  submit: ButtonSignUp = {
    label: 'Sign Up',
    type: 'submit',
    disabled: this.checked
  };

  checkBoxConsent: CheckBoxConsent = {
    name: 'consentSignUp',
    disabled: this.checkBoxDisabled
  }

  onCheckbox($event: any){
    this.checked = $event.target.checked
    if(this.checked){
      this.buttonDisabled = false
    }else{
      this.buttonDisabled = true
    }
  }

  onSubmit() {
    console.log(this.signUpForm.value);
    console.log(this.signUpForm);
    console.log(this.errorMessage);
    if (this.signUpForm.invalid) {
      this.errorForm = true;
    }
  }
}
