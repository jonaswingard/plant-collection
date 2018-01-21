import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Note } from '../models/note';

@Component({
  selector: 'pc-note-list',
  template: `
    <ul>
      <li *ngFor="let note of notes">
        <p *ngIf="note && note._id" [innerHTML]="note.text"></p>
      </li>
    </ul>
  `
})
export class NoteListComponent {
  @Input() notes: Note[];
}
