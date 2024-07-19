import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Posts } from '../model/fetch';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  getPost(): Observable<Posts[]>{
    return this.http.get<Posts[]>('https://jsonplaceholder.typicode.com/posts');
  }
}
