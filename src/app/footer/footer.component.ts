import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})


export class FooterComponent {
  logoUrl: string = 'assets/logo.png';
  contactDetails: { phone: string; email: string } = { phone: '123-456-7890', email: 'info@crown-clothing.com' };
  socialLinks: { name: string; url: string; icon: string }[] = [
    { name: 'Facebook', url: 'https://facebook.com', icon: 'assets/icons/facebook.svg' },
    // ... other social links
  ];
}
