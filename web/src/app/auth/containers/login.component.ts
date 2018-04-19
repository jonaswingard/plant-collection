import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TokenPayload } from '../models/user.model';
import { AuthenticationService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'pc-login-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  
  <form (submit)="login()">
    <div class="form-group">
      <label for="email">Email address</label>
      <input type="email" class="form-control" name="email" placeholder="Enter email" [(ngModel)]="credentials.email">
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input type="password" class="form-control" name="password" placeholder="Password" [(ngModel)]="credentials.password">
    </div>
    <button type="submit" class="btn btn-default">Sign in!</button>
  </form>

  <button (click)="logout()">Log out</button>
  `
})
export class LoginPageComponent {
  credentials: TokenPayload = {
    email: '',
    password: ''
  };

  constructor(private auth: AuthenticationService, private router: Router) { }

  login() {
    this.auth.login(this.credentials).subscribe(
      () => {
        console.log('you are logged in');
        // this.router.navigateByUrl('/profile');
      },
      err => {
        console.error(err);
      }
    );
  }

  logout() {
    this.auth.logout();
  }
}
