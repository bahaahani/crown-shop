import { DataService } from './../data.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-product-details',
  standalone: true,
  templateUrl: './product-details.component.html',
  imports: [CommonModule, HeaderComponent, FooterComponent],
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product: any; // Use the appropriate type for your product

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService // Use the correct variable name for the injected service
  ) {}

  ngOnInit(): void {
    // Convert the ID from string to number if necessary
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadProductDetails(productId);
  }

  loadProductDetails(productId: number) {
    // Using 'find' to get the single product
    this.product = this.dataService.featuredProducts.find(
      (product) => product.id === productId
    );
    // No need to return the product here as it's being set to a class property
  }
}
