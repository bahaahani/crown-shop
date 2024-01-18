import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';


interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})


export class HomeComponent {
  featuredProducts: Product[] = [
    { id: 1, name: 'T-shirt', description: 'High-quality cotton t-shirt', price: 20, imageUrl: 'assets/Tshirt.jpeg' },
    // ... more products
  ];
}
