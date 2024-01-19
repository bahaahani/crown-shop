import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit() {
    // Assume we have a function to get the current user's ID
    const userId = this.getCurrentUserId();
    this.fetchCartItems(userId);
  }

  fetchCartItems(userId: number): void {
    fetch(`http://localhost:3000/api/cart/${userId}`)
      .then((response) => response.json())
      .then((data) => (this.cartItems = data))
      .catch((error) => console.error('Error fetching cart items:', error));
  }

  removeFromCart(productId: number): void {
    const userId = this.getCurrentUserId();
    fetch(`http://localhost:3000/api/cart/remove`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, productId }),
    })
      .then((response) => response.json())
      .then(() => this.fetchCartItems(userId))
      .catch((error) => console.error('Error removing item:', error));
  }

  calculateTotal(): number {
    return this.cartItems.reduce((sum, item) => sum + item.price, 0);
  }

  checkout(): void {
    const userId = this.getCurrentUserId();
    fetch(`http://localhost:3000/api/cart/checkout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    })
      .then((response) => response.json())
      .then(() => {
        alert('Your order has been placed!');
        this.cartItems = [];
      })
      .catch((error) => console.error('Error during checkout:', error));
  }

  getCurrentUserId(): number {
    // Placeholder function to get the current user's ID
    // Replace this with your actual user authentication logic
    return 1; // Assuming a logged in user with ID 1 for demonstration purposes
  }
}
