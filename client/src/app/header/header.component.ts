import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  logoUrl: string = 'assets/logo.png';
  navItems: string[] = ['home', 'about-us', 'login', 'signup'];

  // Other relevant header properties
}
