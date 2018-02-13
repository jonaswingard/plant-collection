import { Component, Input } from '@angular/core';
import { Plant } from '../models/plant';

@Component({
  selector: 'pc-plant-list',
  template: `
    <ul>
      <li *ngFor="let plant of plants">
        <a mat-button [routerLink]="plant._id" *ngIf="plant && plant._id">
            {{ plant.name }} | {{ plant.sort }}
        </a>
      </li>
    </ul>
  `,
  styles: [
    `
    :host {
      display: block;
      width: 400px;
      margin: 0 auto;
    }
    `
  ]
})
export class PlantListComponent {
  @Input() plants: Plant[];
}
