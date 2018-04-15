import { Component, Input } from '@angular/core';
import { Plant } from '../models/plant';

@Component({
  selector: 'pc-plant-nav',
  template: `
    <span>Next: </span>
    <a *ngIf="plant" [routerLink]="['../', plant._id]" title="Back to start...">
      {{plant.name}}
      <mat-icon>arrow_forward</mat-icon>
    </a>
  `,
  styles: [
    `
      :host {
        float: right;
      }
    `
  ]
})
export class PlantNavComponent {
  @Input() plant: Plant;
}
