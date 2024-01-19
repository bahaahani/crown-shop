import { DataService } from './../data.service';
import { Component, Inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
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

  constructor(
    public dataService: DataService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.featuredProducts = this.dataService.loadProducts();
  }

  addToCart(product: Product): void {
    this.dataService.addToCart(product);
    alert('Your product has been added to the cart!');
  }
}
