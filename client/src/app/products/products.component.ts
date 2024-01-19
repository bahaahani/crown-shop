import { CartService } from './../cart.service';
import { DataService } from './../data.service';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

@Component({
  selector: 'app-products',
  standalone: true,
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  imports: [CommonModule, RouterModule],
})
export class ProductsComponent implements OnInit {
  featuredProducts: Product[] = [];

  constructor(
    public dataService: DataService,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.featuredProducts = this.dataService.loadProducts();
  }

  addToCart(product: Product): void {
    this.dataService.addToCart(product);
    alert('Your product has been added to the cart!');
  }
    async addProductToCart(product: Product) {
    try {
      // Replace `userId` with the actual user ID obtained from authentication context or similar
      const userId = 1; // This is just a placeholder
      const response = await this.cartService.addToCart(userId, product.id);
      // Show success message
      console.log('Product added to cart', response);
    } catch (error) {
      // Handle errors here
      console.error('Error adding product to cart:', error);
    }
  }
}
