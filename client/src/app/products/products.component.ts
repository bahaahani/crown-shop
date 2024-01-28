import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute } from '@angular/router'; // Import Router

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
  userId!: number; // Declare userId property
  constructor(
    private dataService: DataService,
    private router: Router,
    private AuthService: AuthService,
  ) {}

  ngOnInit(): void {
    this.userId = this.AuthService.currentUserValue.id;
    // Fetch the featured products from the DataService
    this.dataService
      .loadProducts()
      .then((loadedProducts) => {
        this.featuredProducts = loadedProducts;
      })
      .catch((error) => {
        console.error('Error loading products:', error);
      });

    const currentUser = this.AuthService.currentUserValue;
    if (currentUser && currentUser.id) {
      // User is already logged in, use the existing data
      this.userId = currentUser.id;
    } else {
      // No user in local storage, proceed with login
    }
    this.AuthService.loginUser(currentUser)
      .toPromise()
      .then((userData) => {
        this.userId = userData.id;
      });
  }

  async loadProducts(): Promise<void> {
    try {
      this.featuredProducts = await this.dataService.loadProducts();
    } catch (error: any) {
      console.error('Error loading products:', error);
    }
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
