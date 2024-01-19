import { DataService } from './../data.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
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
  imports: [CommonModule, RouterModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  featuredProducts: Product[] = [];
  DataService: any;
  constructor(public data: DataService) {}

  ngOnInit(): void {
    this.featuredProducts = this.data.loadProducts();
  }
}
