import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Note } from '../models/note';

@Component({
  selector: 'pc-note-list',
  template: `
    <ul>
      <li *ngFor="let note of notes">
        <div>
          <time *ngIf="note.updated">{{ note.updated | date }}</time>
          <time *ngIf="!note.updated">{{ note.created | date }}</time>
          <p *ngIf="note && note._id" [innerHTML]="note.text"></p>
        </div>
        <button title="Edit" mat-icon-button (click)="onAction.emit(['select', note])">
          <mat-icon>edit</mat-icon>
        </button>
        <button title="Delete" mat-icon-button (click)="onAction.emit(['delete', note])">
          <mat-icon>delete</mat-icon>
        </button>
      </li>
    </ul>
  `,
  styles: [
    `
    ul {
      padding: 0;
    }
    li {
      display: flex;
    }
    div + button {
      margin-left: auto;
    }
    time {
      font-style: italic;
    }
  `
  ]
})
export class NoteListComponent {
  @Input() notes: Note[];
  @Output() onAction = new EventEmitter<['select' | 'delete', Note]>();
}
