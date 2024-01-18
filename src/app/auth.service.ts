import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'http://localhost:3000/api/login'; // URL to your login API
  private signupUrl = 'http://localhost:3000/api/signup'; // URL to your signup API

  constructor(private http: HttpClient) {}

  loginUser(user: any) {
    return this.http.post<any>(this.loginUrl, user);
  }

  signupUser(user: any) {
    return this.http.post<any>(this.signupUrl, user);
  }
}
