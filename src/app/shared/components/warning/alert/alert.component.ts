import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { ErrorMode } from '../../../../utils/pipe/errorCode.pipe';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule, ErrorMode],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss'
})
export class AlertComponent {
  @Input() message!: string;
  @Input() class!: string;
}
