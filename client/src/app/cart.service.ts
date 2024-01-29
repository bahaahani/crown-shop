import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  addToCart(userId: string, productId: string): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/cart/add`, { userId, productId })
      .pipe(
        catchError((error) => {
          console.error('Error adding to cart:', error);
          return throwError(error);
        })
      );
  }
  removeFromCart(userId: string, productId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/cart/remove`, { userId, productId });
  }

  getCartItems(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/cart/${userId}`);
  }

  checkoutCart(userId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/cart/checkout`, { userId });
  }
}
