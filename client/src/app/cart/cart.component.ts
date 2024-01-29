import { CartService } from './../cart.service';
import { AuthService } from './../auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
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
      this.router.navigate(['/login']);
      return;
    }
    this.fetchCartItems();
  }

  fetchCartItems(): void {
    this.CartService.getCartItems(this.userId).subscribe(
      (items) => {
        this.cartItems = items;
      },
      (error) => {
        console.error('Error fetching cart items:', error);
      }
    );
  }

  removeFromCart(productId: string): void {
    this.CartService.removeFromCart(this.userId, productId).subscribe(
      () => {
        this.fetchCartItems(); // Refresh cart items
      },
      (error) => {
        console.error('Error removing item from cart:', error);
      }
    );
  }

  calculateTotal(): number {
    return this.cartItems.reduce((sum, item) => sum + item.price, 0);
  }

  checkout(): void {
    this.CartService.checkoutCart(this.userId).subscribe(
      () => {
        this.cartItems = []; // Clear the cart on successful checkout
        alert('Your order has been placed!');
      },
      (error) => {
        console.error('Error during checkout:', error);
      }
    );
  }
}
