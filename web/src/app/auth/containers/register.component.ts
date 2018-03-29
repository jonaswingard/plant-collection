import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TokenPayload } from '../models/user.model';
import { AuthenticationService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'pc-register-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <form (submit)="register()">
      <div class="form-group">
        <label for="name">Full name</label>
        <input type="text" class="form-control" name="name" placeholder="Enter your name" [(ngModel)]="credentials.name">
      </div>
      <div class="form-group">
        <label for="email">Email address</label>
        <input type="email" class="form-control" name="email" placeholder="Enter email" [(ngModel)]="credentials.email">
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" class="form-control" name="password" placeholder="Password" [(ngModel)]="credentials.password">
      </div>
      <button type="submit" class="btn btn-default">Register!</button>
    </form>
  `
})
export class RegisterPageComponent {
  credentials: TokenPayload = {
    email: '',
    name: '',
    password: ''
  };

  constructor(private auth: AuthenticationService, private router: Router) { }

  register() {
    this.auth.register(this.credentials).subscribe(
      () => {
        this.router.navigateByUrl('/auth/login');
      },
      err => {
        console.error(err);
      }
    );
  }
}
