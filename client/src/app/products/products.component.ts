import { DataService } from './../data.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CartComponent } from '../cart/cart.component';
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
  imports: [CommonModule, RouterModule, CartComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  featuredProducts: Product[] = [];
  constructor(public data: DataService, private router: Router) {}

  ngOnInit(): void {
    this.featuredProducts = this.data.loadProducts();
  }
  // Add this method in ProductComponent
  addToCart(product: any): void {
    this.data.addToCart(product);
    this.router.navigate(['/cart']); // Navigate to the cart page
  }
}
