import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'pc-app-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    login
    <app-login-status></app-login-status>
    <router-outlet></router-outlet>
  `
})
export class AppPageComponent { }
