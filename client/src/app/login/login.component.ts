import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './../header/header.component';
import { FooterComponent } from './../footer/footer.component';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
        .pipe(
          catchError((error) => {
            console.error('Login failed', error);
            // Handle login errors
            return of(null); // Return a valid result to continue the Observable chain
          })
        )
        .subscribe((response) => {
          if (response) {
            console.log('Login successful', response);
            // Handle successful login
          }
        });
    }
  }
}
