import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'pc-not-found-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <p>Hey! It looks like this page doesn't exist yet.</p>
  `
})
export class NotFoundPageComponent {
  constructor() {
    console.log('not found');
  }
}
