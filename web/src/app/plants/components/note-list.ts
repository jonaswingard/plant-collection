import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Note } from '../models/note';

@Component({
  selector: 'pc-note-list',
  template: `
    <ul>
      <li *ngFor="let note of notes">
        <p *ngIf="note && note._id" [innerHTML]="note.text"></p>
        <time>{{ note.updated }}</time>
        <button (click)="onAction.emit(['select', note])">Update</button>
        <button (click)="onAction.emit(['delete', note])">Delete</button>
      </li>
    </ul>
  `
})
export class NoteListComponent {
  @Input() notes: Note[];
  @Output() onAction = new EventEmitter<['select' | 'delete', Note]>();
}
