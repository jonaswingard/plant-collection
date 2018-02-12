import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Activity } from '../models/activity';

@Component({
  selector: 'pc-activity-list',
  template: `
    <ul>
      <li *ngFor="let activity of activities">
        <strong [innerHTML]="activity.type"></strong>
        <span>{{ activity.date | date }}</span>
      </li>
    </ul>
  `
})
export class ActivityListComponent {
  @Input() activities: Activity[];
}
