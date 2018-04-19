import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/auth.service';

@Component({
  selector: 'app-login-button',
  template: `
    <a routerLink="/">Start</a>
    <a routerLink="./auth/login" *ngIf="!isLoggedIn">Login</a>
    <a routerLink="./auth/login" *ngIf="isLoggedIn">Logout</a>
  `,
  providers: [AuthenticationService]
})
export class LoginButtonComponent {
  isLoggedIn: boolean;

  constructor(private auth: AuthenticationService) {
    this.isLoggedIn = auth.isLoggedIn();
  }

}
