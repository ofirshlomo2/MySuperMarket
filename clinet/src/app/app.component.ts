import {Component} from '@angular/core';
import {AuthService} from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  username = 'Guest';
  user;

  constructor(private authService: AuthService) {
    this.user = this.authService.getUser();
    if (this.user) {
      this.username = this.user.email;
    }
    this.authService.onLoggedIn$.subscribe((user: any) => {
      if (user) {
        this.user = user;
        this.username = this.user.email;
      }
    });

    this.authService.onLoggedOut$.subscribe(() => {
      this.user = null;
      this.username = '';
    });
  }

  logout() {
    this.authService.logout();
  }
}
