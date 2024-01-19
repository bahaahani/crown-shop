import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = 'http://localhost:3000/api'; 
  async addToCart(userId: number, productId: number): Promise<Response> {
    const response = await fetch(`${this.apiUrl}/cart/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, productId }),
    });
    return response.json();
  }

  async removeFromCart(userId: number, productId: number): Promise<Response> {
    const response = await fetch(`${this.apiUrl}/cart/remove`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, productId }),
    });
    return response.json();
  }

  async getCartItems(userId: number): Promise<Response> {
    const response = await fetch(`${this.apiUrl}/cart/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  }

  async checkoutCart(userId: number): Promise<Response> {
    const response = await fetch(`${this.apiUrl}/cart/checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    });
    return response.json();
  }
}
