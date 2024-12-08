import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PostsService } from '../../service/posts.service';
import { Posts } from '../../model/fetch';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { AboutComponent } from '../about/about.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ButtonComponent, AboutComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  res: Posts[] = [];
  errorMessage!: string;
  label: string = 'test'
  dataFromChild!:string 

  constructor(public postsService: PostsService) {}

  ngOnInit() {
    this.postsService.getPost().subscribe({
      next: (res:any) => {
        this.res = res;
      },
      error: (error:any) => {
        this.errorMessage = error.message;
      },
    });
  }

  onClick() {
    console.log('Halooo')
  }
} 
