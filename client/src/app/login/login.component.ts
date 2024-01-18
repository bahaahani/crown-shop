import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './../header/header.component';
import { FooterComponent } from './../footer/footer.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user = { email: '', password: '' };

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  onLogin(form: NgForm) {
    if (form.valid) {
      this.authService
        .loginUser(this.user)
        .then((response) => {
          console.log('Login successful', response);
          // Handle successful login
        })
        .catch((error) => {
          console.error('Login failed', error);
          // Handle login errors
        });
    }
  }
}
