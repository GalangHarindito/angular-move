import { Component, CUSTOM_ELEMENTS_SCHEMA,EventEmitter,Input, NO_ERRORS_SCHEMA, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';


@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss',
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class CheckboxComponent {
  @Input() checked! : boolean;
  @Input() name! : string;
  @Input() groupName!: FormGroup;
  @Input() controlName!: string;
  @Input() disabled: boolean = false;
  @Output() onChange = new EventEmitter<any>()

  onCheckChange($event: any){
    this.onChange.emit($event)
  }
}
