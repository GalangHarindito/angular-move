import { CommonModule } from '@angular/common';
import { Component, DoCheck, EventEmitter, forwardRef, OnChanges, Output } from '@angular/core';
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
import { UserRegister } from '../../../service/signup/model';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { UserSignUpState } from '../../../utils/app.state';
import { RouterLink } from '@angular/router';
import { AlertComponent } from '../../../shared/components/warning/alert/alert.component';
import { signUpFailure } from '../../../store/action/signup.action';

@Component({
  selector: 'app-signup-form',
  standalone: true,
  imports: [
    CommonModule,
    InputComponent,
    ButtonComponent,
    ReactiveFormsModule,
    CheckboxComponent,
    PasswordComponent,
    RouterLink,
    AlertComponent
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
  loading$: Observable<boolean>;
  @Output() dataSignUp = new EventEmitter<UserRegister>();
  error$!: Observable<string>;
  danger: string = 'danger';
  errorSubscription: Subscription = new Subscription();
  alertVisible: boolean = true;
  

  constructor(private formBuilder: FormBuilder, private store: Store<UserSignUpState>) {
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
        lastName: [],
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
    this.loading$ = this.store.select((state) => state.loading);
    this.error$ = this.store.select(state => state.signup?.error?.message);
    this.errorSubscription = this.error$.subscribe(errorMessage => {
      if (errorMessage) {
        this.showAlert(errorMessage);
      }
    });
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

  showAlert(message: string) {
    this.errorMessage = message; 
    this.alertVisible = true; 

    // Hide the alert after 2 seconds
    setTimeout(() => {
      this.alertVisible = false; 
      this.store.dispatch(signUpFailure({ error: '' }));
  },2000)
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
    if (this.signUpForm.invalid) {
      this.errorForm = true;
    }
    const {confirmPassword: _, ...data} = this.signUpForm.value
    if (this.signUpForm.valid) {
      this.dataSignUp.emit(data);
    }
   
  }
}
