import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyComponent } from './company/company.component';
import { DataModel } from './model';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'About',
  standalone: true,
  imports: [CompanyComponent, CommonModule, RouterModule, RouterOutlet,],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  data!: string
  dataParent: DataModel = {
    name: 'Parent',
    age: 30,
  }

  constructor() {}

  addNewData(value: string){
    console.log(value)
  } 

}
