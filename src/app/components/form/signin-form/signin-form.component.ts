import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, forwardRef, NO_ERRORS_SCHEMA, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from '../../../shared/components/input/input/input.component';
import { PasswordComponent } from '../../../shared/components/input/password/password.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { AlertComponent } from '../../../shared/components/warning/alert/alert.component';
import {
  FormBuilder,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonSignIn, SignInFormModel } from './model';
import { UserModel } from '../../../service/signin/model';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../utils/app.state';
import { signInFailure } from '../../../store/action/auth.action';

@Component({
  selector: 'app-signin-form',
  standalone: true,
  imports: [
    ButtonComponent,
    AlertComponent,
    CommonModule,
    InputComponent,
    PasswordComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './signin-form.component.html',
  styleUrl: './signin-form.component.scss',
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SigninFormComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => SigninFormComponent),
      multi: true,
    },
  ],
})
export class SigninFormComponent {
  signInForm!: FormGroup;
  private formStatusSignal = signal<string>('INVALID');
  buttonDisabled = computed(() => this.formStatusSignal() !== 'VALID');
  loading$: Observable<boolean>;
  error$!: Observable<string>;
  message!: string;
  danger: string = 'danger';
  @Output() dataSignIn = new EventEmitter<UserModel>();
  private formStatusSub!: Subscription;
  
  constructor(private formBuilder: FormBuilder, private store: Store<AppState>) {
    this.signInForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
    });
    this.loading$ = this.store.select((state) => state.loading);
    this.error$ = this.store.select(state => state.auth?.error?.message);
  }

  signInData: SignInFormModel[] = [
    {
      label: 'Email',
      name: 'email',
      placeholder: 'John@gmail.com',
    },
    {
      label: 'Password',
      name: 'password',
      placeholder: 'Password',
    },
  ];

  ngOnInit() {
    this.formStatusSub = this.signInForm.statusChanges.subscribe(status => {
      this.formStatusSignal.set(status);
    });
  }

  ngOnDestroy() {
    if (this.formStatusSub) {
      this.formStatusSub.unsubscribe();
    }
  }

  submit: ButtonSignIn = {
    label: 'Sign Up',
    type: 'submit',
    disabled: true,
  };

  get value(){
    return this.signInForm.value;
  }

  onSubmit(data: UserModel) {
    if (this.signInForm.valid) {
      this.dataSignIn.emit(data);
      this.store.dispatch(signInFailure({ error: '' }));
    }
  }
}
