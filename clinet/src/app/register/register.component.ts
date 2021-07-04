import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { strict } from 'assert';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  email = '';
  password = '';
  userId = '';
  step = 1;
  city = '';
  street = '';
  fullName = '';
  cities = ['Jerusalem', 'Tel Aviv', 'Haifa'];
  errorText = '';
  hasError: boolean = false;
  repassword: string;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  registerUser() {
    this.authService
      .register(
        this.email,
        this.password,
        this.userId,
        this.city,
        this.street,
        this.fullName
      )
      .subscribe(
        (res) => {
          this.router.navigate(['/login']);
        },
        (error) => alert('error register')
      );
  }

  async checkStep1() {
    if (!this.email || !this.userId || !this.password) {
      this.showRegistrationError('All field are mandatory');
      return;
    }
    if (this.password !== this.repassword) {
      this.showRegistrationError("Password didn't match");
      return;
    }
    const isIdExist = await this.authService
      .checkIfIdExist(this.userId)
      .toPromise();
    if (isIdExist) {
      this.showRegistrationError('Id already exist');
      return;
    }

    if (!this.emailCorrect(this.email)) {
      this.showRegistrationError('Id already exist');
      return;
    }

    this.step = 2;
  }

  private emailCorrect(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  private showRegistrationError(error: string) {
    this.errorText = error;
    this.hasError = true;
    setTimeout(() => {
      this.hasError = false;
    }, 4000);
  }
}
