import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { DataModel } from '../model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'Company',
  standalone: true,
  imports: [ButtonComponent, CommonModule],
  templateUrl: './company.component.html',
  styleUrl: './company.component.scss',
})
export class CompanyComponent {

  constructor() {}
  
  @Input() dataFromParent!: DataModel;
  @Output() dataShared = new EventEmitter<string>();
  data: string = 'asasa';
  label: string = 'button';
  buttonHide: string = 'hide';
  hide: boolean = false;

  onClick(value: string) {
    this.dataShared.emit(value);
  }

  onHide(){
    this.hide = !this.hide;
  }
}
