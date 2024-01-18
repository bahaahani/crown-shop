import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = { username: '', password: '' };

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  onLogin() {
    this.authService.loginUser(this.user).subscribe(
      data => console.log(data),
      error => console.error(error)
    );
  }
}
