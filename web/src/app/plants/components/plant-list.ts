import { Component, Input } from '@angular/core';
import { Plant } from '../models/plant';

@Component({
  selector: 'pc-plant-list',
  template: `
    <ul>
      <li *ngFor="let plant of plants">
        <a [routerLink]="plant._id" *ngIf="plant && plant._id">
            {{ plant.name }}
        </a>
      </li>
    </ul>
  `
})
export class PlantListComponent {
  @Input() plants: Plant[];
}
