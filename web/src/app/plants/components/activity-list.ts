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
          <button title="Edit" mat-icon-button (click)="onAction.emit(['select', activity])">
            <mat-icon>edit</mat-icon>
          </button>
          <button mat-icon-button (click)="onDelete.emit(activity)">
            <mat-icon>delete</mat-icon>
          </button>
        </li>
      </ul>
  `
})
export class ActivityListComponent {
  @Input() activities: Activity[];
  @Output() onDelete = new EventEmitter<Activity>();
  @Output() onAction = new EventEmitter<['select' | 'delete', Activity]>();
}
