import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges
} from '@angular/core';
import { Plant } from '../models/plant';

@Component({
  selector: 'pc-plant-view',
  template: `
  <mat-card class="example-card">
    <mat-card-header>
      <div mat-card-avatar>
        <img *ngIf="plant && plant.image_url" mat-card-image [src]="'http://localhost:8080/' + plant.image_url">
      </div>
      <mat-card-title>{{ plant.name }}</mat-card-title>
      <mat-card-subtitle>Latin...</mat-card-subtitle>
    </mat-card-header>
    <img *ngIf="plant && plant.image_url" mat-card-image [src]="'http://localhost:8080/' + plant.image_url">
    <button mat-fab (click)="onEdit.emit(true)">
      <mat-icon>edit</mat-icon>
    </button>
    <mat-card-content>
      <p>{{ plant.water }}</p>
      <p>{{ plant.fertilize }}</p>
      <p>{{ plant.placement }}</p>
    </mat-card-content>
    <mat-card-actions>
      <button mat-button>ADD WATER</button>
      <button mat-button>ADD NUTRITION</button>
    </mat-card-actions>
  </mat-card>
  `,
  styles: [
    `
    .mat-card-avatar {
      overflow: hidden;
    }
    [mat-fab] {
      position: absolute;
      right: 24px;
      margin-top: -50px;
    }
    
  `
  ]
})
export class PlantViewComponent {
  @Input() plant: Plant;
  @Output() onEdit = new EventEmitter<void>();
  constructor() {}
}
