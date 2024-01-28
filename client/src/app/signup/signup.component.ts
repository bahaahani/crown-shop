import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';

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
  errorMessage = '';
  onSignup(form: any) {
    this.authService
      .register(form.value)
      .toPromise()
      .then((response) => {
        if (response.message) {
          // Handle the response message
          if (response.message === 'User already exists') {
            this.errorMessage =
              'This email is already registered. Try logging in.';
          } else {
            // Handle other messages or success
            this.errorMessage = '';
            alert('User registered successfully' + response);
            // Redirect to login or other actions
          }
        }
      })
      .catch((error) => {
        alert('Signup error:' + error);
        this.errorMessage =
          'An error occurred during signup. Please try again.';
      });
  }
}
