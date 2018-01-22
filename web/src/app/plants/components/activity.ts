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
      <button (click)="addActivity()">
        Add Activity
      </button>

  `
})
export class ActivityComponent implements OnChanges {
  @Input() plant: Plant;
  @Output() onAdd = new EventEmitter<Activity>();

  constructor() {}

  ngOnChanges(changes) {}

  addActivity() {
    this.onAdd.emit(<Activity>{
      plant_id: this.plant._id,
      date: new Date(),
      type: 'water'
    });
  }
}
