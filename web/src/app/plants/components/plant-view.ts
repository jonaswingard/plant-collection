import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges
} from '@angular/core';
import { Plant } from '../models/plant';
import { Activity } from '../models/activity';

@Component({
  selector: 'pc-plant-view',
  template: `
  <mat-card>
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
      <button mat-button (click)="addActivity('water')">ADD WATER</button>
      <button mat-button (click)="addActivity('nutrition')">ADD NUTRITION</button>
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
  @Output() onAddActivity = new EventEmitter<Activity>();

  addActivity(type: string) {
    this.onAddActivity.emit(<Activity>{
      plant_id: this.plant._id,
      date: new Date(),
      type
    });
  }
}
