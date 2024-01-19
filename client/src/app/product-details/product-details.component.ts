import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from './../data.service';
import { CommonModule } from '@angular/common';

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
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadProductDetails(productId);
  }

  loadProductDetails(productId: number): void {
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
    const userId = this.getCurrentUserId();
    this.dataService
      .addToCart(userId, this.product.id)
      .then(() => {
        // Handle successful addition to cart
        console.log('Product added to cart');
      })
      .catch((error) => {
        // Handle error
        console.error('Error adding to cart:', error);
      });
  }

  getCurrentUserId(): number {
    // Implement this method based on your user authentication logic
    return 1; // Example user ID
  }
}
