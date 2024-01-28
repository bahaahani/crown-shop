import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from './../data.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
interface Product {
  id: number;
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
  imports: [CommonModule],
})
export class ProductDetailsComponent implements OnInit {
  product!: Product;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private AuthService: AuthService
  ) {}
  userId!: any; // Declare userId property
  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.loadProductDetails(productId);
    } else {
      console.error('Product ID is undefined');
      // Handle the undefined ID, perhaps by redirecting back to a product list
    }
    console.log('Product details', productId);
    this.userId = this.AuthService.getCurrentUserId();
  }

  loadProductDetails(productId: string): void {
    // Fetch the product details from the DataService
    this.dataService
      .getProduct(productId)
      .then((product) => {
        this.product = product;
      })
      .catch((error) => {
        console.error('Error loading product:', error);
      });
  }

  addToCart(): void {
    // Assuming you have a method to get the current user's ID
    this.dataService
      .addToCart(this.userId, this.product.id)
      .then(() => {
        // Handle successful addition to cart
        console.log('Product added to cart');
      })
      .catch((error) => {
        // Handle error
        console.error('Error adding to cart:', error);
      });
  }
}
