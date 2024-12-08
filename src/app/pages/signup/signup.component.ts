import { Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { SignupFormComponent } from '../../components/form/signup-form/signup-form.component';
import { CommonModule } from '@angular/common';
import { UserRegister } from '../../service/signup/model';
import { signUp } from '../../store/action/signup.action';
import { Store } from '@ngrx/store';
import { UserSignUpState } from '../../utils/app.state';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [SignupFormComponent, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
  
})
export class SignupComponent {
  constructor(private store: Store<UserSignUpState>) { 
    
  }

  onSubmit(data: UserRegister) {
    console.log(data,'signup')
    // const { email, password, firstName, lastName } = data;
    this.store.dispatch(signUp(data));
    
  }
}
