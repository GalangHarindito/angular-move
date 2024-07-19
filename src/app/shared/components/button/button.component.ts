import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SpinnerComponent } from '../spinner/spinner.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, SpinnerComponent],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  constructor() {}
  @Input() label!: string;
  @Input() type!: string;
  @Input() disabled: boolean = false; 
  @Input() loading: boolean = false;
  @Output() onClick = new EventEmitter<any>()

  onClickButton () {
    this.onClick.emit()
  }

}
