import { HeaderComponent } from './../header/header.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../footer/footer.component';
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
  imports: [CommonModule, FormsModule,HeaderComponent,FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})


export class HomeComponent {
  featuredProducts: Product[] = [
    { id: 1, name: 'T-shirt', description: 'High-quality cotton t-shirt', price: 20, imageUrl: 'assets/Tshirt.jpeg' },
    { id: 2, name: 'Hoodie', description: 'High-quality cotton hoodie', price: 32, imageUrl: 'assets/hoodie.jpeg' },
    { id: 3, name: 'Jacket', description: 'High-quality cotton jacket', price: 45, imageUrl: 'assets/jacket.jpg' },
    { id: 4, name: 'Pants', description: 'High-quality cotton pants', price: 25, imageUrl: 'assets/pants.jpeg' },
    // ... more products
  ];
}
