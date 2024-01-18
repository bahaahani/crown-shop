import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from './../header/header.component';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css',
})
export class AboutUsComponent {
  companyInfo: string =
    'Crown Clothing is a contemporary clothing shop offering the latest in fashion trends.';
  founders: string[] = ['Alice Johnson', 'John Doe'];
  missionStatement: string =
    'Our mission is to provide high-quality clothing at affordable prices.';
  values = ['Quality', 'Affordability', 'Customer Satisfaction'];

  // Other relevant information
}
