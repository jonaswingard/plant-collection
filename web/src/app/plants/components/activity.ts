import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Plant } from '../models/plant';
import { Activity } from '../models/activity';

@Component({
  selector: 'pc-activity',
  template: `

      <mat-form-field>
        <input matInput [matDatepicker]="picker" placeholder="Choose a date" [(ngModel)]="date">
        <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
        <mat-datepicker #picker></mat-datepicker>
      </mat-form-field>

      <button mat-raised-button (click)="addActivity('water')">
        Add Water
      </button>
      <button mat-raised-button (click)="addActivity('nutrition')">
        Add Nutrition
      </button>
  `
})
export class ActivityComponent implements OnChanges {
  @Input() plant: Plant;
  @Output() onAdd = new EventEmitter<Activity>();
  date: Date;

  ngOnChanges(changes) {}

  addActivity(type: string) {
    this.onAdd.emit(<Activity>{
      plant_id: this.plant._id,
      date: this.date,
      type
    });
  }
}
