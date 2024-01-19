import { Injectable } from '@angular/core';
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

  async loadProducts(): Promise<Product[]> {
    const response = await fetch(`${this.apiUrl}/products`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }
  productId!: number;
  constructor() {}
  featuredProducts: Product[] = [];
  private cartItems: any[] = [];

  async getProduct(productId: number): Promise<Product> {
    const response = await fetch(`${this.apiUrl}/products/${productId}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }

  async addToCart(userId: number, productId: number): Promise<void> {
    await fetch(`${this.apiUrl}/cart/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, productId }),
    });
  }
  removeFromCart(productId: number): void {
    this.cartItems = this.cartItems.filter((item) => item.id !== productId);
  }

  getCartItems(): any[] {
    return this.cartItems;
  }
}
