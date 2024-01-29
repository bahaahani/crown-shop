import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/api';
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser = this.currentUserSubject.asObservable();

  constructor(private router: Router, private http: HttpClient) {} // Updated constructor

  getCurrentUserId(): string | null {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const userData = JSON.parse(currentUser);
      return userData.id;
    }
    return null;
  }

  get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  register(user: any): Observable<any> {
    const url = `${this.baseUrl}/signup`;
    return this.http.post(url, user).pipe(
      tap((response) => {
        console.log('Register successful', response);
        // Handle successful registration
      }),
      catchError(this.handleError)
    );
  }
  loginUser(user: any): Observable<any> {
    const url = `${this.baseUrl}/login`;
    return this.http.post(url, user).pipe(
      tap((userData: any) => {
        if (userData && userData.token) {
          localStorage.setItem('currentUser', JSON.stringify(userData.user));
          localStorage.setItem('token', userData.token);
          this.currentUserSubject.next(userData.user);
          this.router.navigate(['/']);
        } else {
          throw new Error('Login failed, token is missing');
        }
      }),
      catchError(this.handleError)
    );
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  private handleError(error: any) {
    console.error('API Error:', error);
    const errorMessage = 'An error occurred while making the API request.';
    return throwError(errorMessage);
  }
}
