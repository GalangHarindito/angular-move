import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserModel } from './model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private cookieService : CookieService) {}

  setToken(value: string){
    return this.cookieService.set('s', value)
  }

  setTokenRefresh(value: string){
    return this.cookieService.set('refresh', value)
  }

  fetchUser(data: UserModel ){
    return this.http.post('http://localhost:3000/api/auth/signin', data)
  }
}
