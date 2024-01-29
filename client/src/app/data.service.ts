import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}
@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'http://localhost:3000/api'; // Adjust if your API is hosted elsewhere

  loadProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products`);
  }
  productId!: string;
  constructor(private http: HttpClient) {}
  featuredProducts: Product[] = [];
  private cartItems: any[] = [];

  getProduct(productId: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/products/${productId}`);
  }

  addToCart(userId: number, productId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/cart/add`, { userId, productId });
  }
  removeFromCart(userId: number, productId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/cart/remove`, { userId, productId });
  }

  getCartItems(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/cart/${userId}`);
  }
}
