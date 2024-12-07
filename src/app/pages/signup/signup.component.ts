import { Component } from '@angular/core';
import { SignupFormComponent } from '../../components/form/signup-form/signup-form.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [SignupFormComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

}
