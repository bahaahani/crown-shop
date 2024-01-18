import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent {
  logoUrl: string = 'assets/logo.png';
  navItems: string[] = ['Home', 'Shop', 'About Us', 'Contact'];
  
  // Other relevant header properties
}


