import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router'; // Import Router

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
  userId: number = 1; // Replace with the actual logic to obtain the user's ID

  constructor(private dataService: DataService, private router: Router) {} // Inject Router

  ngOnInit(): void {
    this.dataService
      .loadProducts()
      .then((products) => {
        this.featuredProducts = products;
      })
      .catch((error) => {
        console.error('Error loading products:', error);
      });
  }

  async loadProducts(): Promise<void> {
    try {
      this.featuredProducts = await this.dataService.loadProducts();
    } catch (error: any) {
      // Type error
      console.error('Error loading products:', error);
    }
  }

  getCurrentUserId(): number {
    // Implement getCurrentUserId
    return this.userId;
  }

  async addToCart(product: Product): Promise<void> {
    try {
      await this.dataService.addToCart(1, product.id); // Pass product.id
      this.router.navigate(['/cart']); // Navigate to the cart page
    } catch (error: any) {
      console.error('Error adding to cart:', error);
    }
  }
}
