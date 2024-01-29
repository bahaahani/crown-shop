import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  addToCart(userId: string, productId: string): Observable<any> {
    if (!userId || !productId) {
      console.error('addToCart: missing userId or productId');
      return throwError('Missing userId or productId');
    }

    return this.http.post(`${this.apiUrl}/add`, { userId, productId }).pipe(
      catchError((error) => {
        console.error('Error adding to cart:', error);
        return throwError('Error adding to cart');
      })
    );
  }

  removeFromCart(userId: string, productId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/remove`, { userId, productId });
  }

  getCartItems(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${userId}`);
  }

  checkoutCart(userId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/checkout`, { userId });
  }
}
