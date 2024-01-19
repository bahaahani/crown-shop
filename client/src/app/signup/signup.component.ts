import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './../header/header.component';
import { FooterComponent } from './../footer/footer.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  imports: [CommonModule, FormsModule],
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  user = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  onSignup(form: NgForm) {
    if (form.valid) {
      this.authService
        .register(this.user)
        .then((response) => {
          console.log('User registered successfully', response);
          // Handle successful registration
        })
        .catch((error) => {
          console.error('Registration failed', error);
          // Handle registration errors
        });
    }
  }
}
