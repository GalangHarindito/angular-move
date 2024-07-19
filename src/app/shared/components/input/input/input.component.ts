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
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
})
export class InputComponent {
  @Input() text!: string;
  @Input() name!: string;
  @Input() placeHolder!: string;
  @Input() controlName!: string;
  @Input() groupName!: FormGroup;
  @Input() error!: boolean;
  @Input() helpers!: string;
  @Input() errorMessage!: string;

  // minLenght: string =
  //   this.groupName.controls[this.controlName]['errors']?.['minlength'][
  //     'requiredLength'
  //   ];
  // maxLenght: string =
  //   this.groupName.controls[this.controlName]['errors']?.['maxlength'][
  //     'requiredLength'
  //   ];

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

  // 'minlength': `This field required min ${this.minLength} characters`,
  // 'maxlength': `This field required max ${this.maxLenght} characters`,
  // 'email': 'Wrong Email format',
  // 'missmatch': "This field doesn't match"
}
