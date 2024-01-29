import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute } from '@angular/router'; // Import Router
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.userId = this.AuthService.currentUserValue.id;

    this.dataService.loadProducts().subscribe(
      (loadedProducts) => {
        this.featuredProducts = loadedProducts;
      },
      (error) => {
        console.error('Error loading products:', error);
      }
    );

    const currentUser = this.AuthService.currentUserValue;
    if (!currentUser || !currentUser.id) {
      // Redirect to login or handle the absence of a logged-in user
    }
  }

  loadProducts() {
    return this.dataService.loadProducts().subscribe(
      (loadedProducts) => {
        this.featuredProducts = loadedProducts;
      },
      (error) => {
        console.error('Error loading products:', error);
      }
    );
  }

  addToCart(product: Product): void {
    this.dataService.addToCart(1, product.id).subscribe(
      () => {
        this.router.navigate(['/cart']);
      },
      (error) => {
        console.error('Error adding to cart:', error);
      }
    );
  }
}
