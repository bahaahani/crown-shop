import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = 'http://localhost:3000/api';
  async addToCart(userId: string, productId: string): Promise<any> {
    try {
      const response = await fetch(`${this.apiUrl}/cart/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, productId }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error; // Rethrow the error or handle it as needed
    }
  }

  async removeFromCart(userId: string, productId: string): Promise<any> {
    const response = await fetch(`${this.apiUrl}/cart/remove`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, productId }),
    });
    return response.json();
  }

  async getCartItems(userId: string): Promise<any> {
    const response = await fetch(`${this.apiUrl}/cart/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  }

  async checkoutCart(userId: string): Promise<any> {
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
