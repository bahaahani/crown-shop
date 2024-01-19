import { Injectable } from '@angular/core';
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}
@Injectable({
  providedIn: 'root',
})
export class DataService {
  productId!: number;
  constructor() {}
  featuredProducts: Product[] = [
    {
      id: 1,
      name: 'T-shirt',
      description: 'High-quality cotton t-shirt',
      price: 20,
      imageUrl: 'assets/Tshirt.jpeg',
    },
    {
      id: 2,
      name: 'Hoodie',
      description: 'High-quality cotton hoodie',
      price: 32,
      imageUrl: 'assets/hoodie.jpeg',
    },
    {
      id: 3,
      name: 'Jacket',
      description: 'High-quality cotton jacket',
      price: 45,
      imageUrl: 'assets/jacket.jpg',
    },
    {
      id: 4,
      name: 'Pants',
      description: 'High-quality cotton pants',
      price: 25,
      imageUrl: 'assets/pants.jpeg',
    },
    // ... more products
  ];
  private cartItems: any[] = [];
  addToCart(product: any): void {
    this.cartItems.push(product);
  }

  removeFromCart(productId: number): void {
    this.cartItems = this.cartItems.filter((item) => item.id !== productId);
  }

  getCartItems(): any[] {
    return this.cartItems;
  }
  loadProducts() {
    return this.featuredProducts;
  }
}
