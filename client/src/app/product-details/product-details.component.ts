import { CartService } from './../cart.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DataService } from '../product.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
interface Product {
  id: any;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class ProductDetailsComponent implements OnInit {
  product!: Product;
  successMessage = 'Product added to cart';
  failureMessage = 'Error adding to cart';
  showSuccessMessage = false;
  cartItemCount = 0;
  showFailureMessage = false;

  constructor(
    private route: ActivatedRoute,
    private CartService: CartService,
    private AuthService: AuthService,
    private dataService: DataService
  ) {}
  userId!: any; // Declare userId property
  productId!: any;
  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');

    if (!productId) {
      console.error('Product ID is undefined');
    }
    console.log('Product details', productId);
    this.productId = this.loadProductDetails(productId!);
    this.userId = this.AuthService.getCurrentUserId();
  }

  loadProductDetails(productId: string): void {
    this.dataService.getProduct(productId).subscribe(
      (product) => {
        this.product = product;
      },
      (error) => {
        console.error('Error loading product:', error);
        // Optionally, handle the error state in the UI
      }
    );
  }

  addToCart(productId: string): void {
    console.log('Product ID', productId);
    if (!this.userId || !productId) {
      console.error('Missing userId or productId');
      // Handle this error in your UI
      return;
    }
    this.CartService.addToCart(this.userId, this.product.id).subscribe(
      () => {
        console.log('Product added to cart');

        this.showSuccessMessage = true; // Add a boolean property to show the success message
        this.cartItemCount++; // Increment the cart item count
        setTimeout(() => {
          // Use Angular's setTimeout() method to hide the message again after 3 seconds
          this.showSuccessMessage = false;
        }, 3000);
      },
      (error) => {
        console.error('Error adding to cart:', error);
        this.showFailureMessage = true; // Add a boolean property to show the failure message
        setTimeout(() => {
          // Use Angular's setTimeout() method to hide the message again after 3 seconds
          this.showFailureMessage = false;
        }, 3000);
      }
    );
  }
}
