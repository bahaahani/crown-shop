import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

interface User {
  id: string;
  // Other user properties
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3000';
  private currentUserSubject = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient, private router: Router) {}

  getCurrentUserId(): string | null {
    const currentUser = localStorage.getItem('currentUser');
    return currentUser ? JSON.parse(currentUser).id : null;
  }

  get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  register(user: any): Observable<any> {
    const url = `${this.baseUrl}/signup`;
    user.id = uuidv4(); // Assign a unique ID to the user
    return this.http.post<User>(url, user).pipe(
      tap((userData) => {
        localStorage.setItem('currentUser', JSON.stringify(userData));
        this.currentUserSubject.next(userData);
        this.router.navigate(['/']);
      }),
      catchError(this.handleError)
    );
  }

  loginUser(user: any): Observable<any> {
    const url = `${this.baseUrl}/login`;
    return this.http.post<User>(url, user).pipe(
      tap((userData) => {
        localStorage.setItem('currentUser', JSON.stringify(userData));
        this.currentUserSubject.next(userData);
        this.router.navigate(['/']);
      }),
      catchError(this.handleError)
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  private handleError(error: any): Observable<never> {
    console.error('API Error:', error);
    return throwError('An error occurred while making the API request.');
  }
}
