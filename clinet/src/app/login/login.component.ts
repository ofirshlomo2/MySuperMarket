import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  login() {
    this.authService.login(this.email, this.password).subscribe(
      (res) => {
        console.log(res);
        this.authService.setUser(res);
        this.authService.createCart();
        this.authService.onUserLoggedIn(res);
        this.router.navigate(['/home']);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
