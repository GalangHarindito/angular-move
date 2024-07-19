import {
  Component,
  Input,
  NO_ERRORS_SCHEMA,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { errorModel } from '../../../../utils/errorsDetail';

@Component({
  selector: 'app-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './password.component.html',
  styleUrl: './password.component.scss',
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
})
export class PasswordComponent {
  type: string = 'password';
  @Input() text!: string;
  @Input() name!: string;
  @Input() placeHolder!: string;
  @Input() controlName!: string;
  @Input() groupName!: FormGroup;
  @Input() helpers!: string;
  @Input() error!: boolean;

  onPassword() {
    this.type = this.type === 'password' ? 'text' : 'password';
  }

  get control() {
    return this.groupName.controls;
  }

  get minLength() {
    return this.groupName.controls[this.controlName]['errors']?.['minlength'][
      'requiredLength'
    ];
  }

  get maxLength() {
    return this.groupName.controls[this.controlName]['errors']?.['maxlength'][
      'requiredLength'
    ];
  }

  get errorType() {
    const r = this.groupName.controls[this.controlName]['errors'];
    return Object.keys(r as string[]);
  }
  errorDetails: any = errorModel;
}
