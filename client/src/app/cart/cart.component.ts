import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'], // Corrected property name
})
export class CartComponent implements OnInit {
  cartItems: any[] = []; // Adjust the type to match your product type

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit() {
    this.cartItems = this.dataService.getCartItems();
  }

  removeFromCart(productId: number): void {
    this.dataService.removeFromCart(productId);
    this.cartItems = this.dataService.getCartItems(); // Update local cartItems after removal
  }

  getTotal(): number {
    return this.cartItems.reduce((sum, item) => sum + item.price, 0);
  }

  clearCart(): void {
    this.cartItems = [];
  }

  checkout(): void {
    // Implement checkout logic here
    alert('Your order has been placed!');
    this.clearCart();
  }

  getQuantity(): number {
    return this.cartItems.length;
  }

  getQuantityForProduct(productId: number): number {
    return this.cartItems.filter((item) => item.id === productId).length;
  }

  getSubtotalForProduct(productId: number): number {
    const product = this.cartItems.find((item) => item.id === productId);
    return product ? product.price * this.getQuantityForProduct(productId) : 0;
  }
  calculateTotal(): number {
    return this.cartItems.reduce(
      (sum, item) => sum + item.price * this.getQuantityForProduct(item.id),
      0
    );
  }
}
