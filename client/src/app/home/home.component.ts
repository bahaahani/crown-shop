import { AuthService } from './../auth.service';
import { DataService } from '../product.service';
import { HeaderComponent } from './../header/header.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../footer/footer.component';
import { ProductsComponent } from '../products/products.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HeaderComponent,
    FooterComponent,
    ProductsComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(private AuthService: AuthService) {
    this.userId = this.AuthService.getCurrentUserId();
    console.log('User ID', this.userId);
  }

  userId: any;
}
