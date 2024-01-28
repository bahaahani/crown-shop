import { CartService } from './../cart.service';
import { AuthService } from './../auth.service';
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
  userId!: string;
  constructor(
    private CartService: CartService,
    private router: Router,
    private AuthService: AuthService
  ) {}

  ngOnInit() {
    this.userId = this.AuthService.getCurrentUserId()!;
    if (!this.userId) {
      // Redirect to login or show an error message
      this.router.navigate(['/login']);
      return;
    }
    this.fetchCartItems();
  }

  async fetchCartItems(): Promise<void> {
    try {
      this.cartItems = await this.CartService.getCartItems(this.userId);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  }

  async removeFromCart(productId: string): Promise<void> {
    try {
      await this.CartService.removeFromCart(this.userId, productId);
      await this.fetchCartItems(); // Refresh cart items
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  }

  calculateTotal(): number {
    return this.cartItems.reduce((sum, item) => sum + item.price, 0);
  }

  async checkout(): Promise<void> {
    try {
      await this.CartService.checkoutCart(this.userId);
      this.cartItems = []; // Clear the cart on the frontend
      alert('Your order has been placed!');
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  }
}
