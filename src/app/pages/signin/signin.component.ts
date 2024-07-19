import { Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { SigninFormComponent } from '../../components/form/signin-form/signin-form.component';
import { AuthService } from '../../service/signin/auth.service';
import { AlertComponent } from '../../shared/components/warning/alert/alert.component';
import { UserModel } from '../../service/signin/model';
import { signIn } from '../../store/action/auth.action';
import { Store } from '@ngrx/store';
import { AppState } from '../../utils/app.state';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, SigninFormComponent, AlertComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
})
export class SigninComponent {
  constructor(
    // private authService: AuthService,
    private store: Store<AppState>
  ) {
  }

  // onSubmit(data: UserModel){
  //   this.authService.fetchUser(data).subscribe({
  //     next: (data: any) => {
  //       this.authService.setToken(data.access_token)
  //       this.authService.setTokenRefresh(data.refresh_token)
  //     }
  //   })
  // }

  onSubmit(data: UserModel) {
    const { email, password } = data;
    this.store.dispatch(signIn({ email, password }));
    
  }
}
