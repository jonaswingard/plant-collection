import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'pc-app-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <router-outlet></router-outlet>
  `
})
export class AppPageComponent {}
