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

  ngOnChanges(changes) {}

  addActivity(type: string) {
    this.onAdd.emit(<Activity>{
      plant_id: this.plant._id,
      date: new Date(),
      type
    });
  }
}
