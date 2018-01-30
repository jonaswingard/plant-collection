import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { defer } from 'rxjs/observable/defer';
import { of } from 'rxjs/observable/of';

import * as note from '../actions/note';
import { Router, ActivatedRoute } from '@angular/router';
import { NotesService } from '../../services/notes.service';
import { Note } from '../../models/note';

@Injectable()
export class NoteEffects {
  constructor(
    private actions$: Actions,
    private notesService: NotesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  @Effect()
  load$: Observable<Action> = this.actions$
    .ofType<note.Load>(note.LOAD)
    .map(action => action.payload)
    .switchMap(plantId =>
      this.notesService
        .getNotes(plantId)
        .map((notes: Note[]) => new note.LoadSuccess(notes))
    );

  @Effect()
  add$: Observable<Action> = this.actions$
    .ofType<note.Add>(note.ADD)
    .map(action => action.payload)
    .switchMap(item => this.notesService.addNote(item))
    .map(item => ({
      type: 'add',
      item
    }))
    .map(data => new note.SaveSuccess(data));

  @Effect()
  update$: Observable<Action> = this.actions$
    .ofType<note.Update>(note.UPDATE)
    .map(action => action.payload)
    .switchMap(item => this.notesService.updateNote(item))
    .map(
      () =>
        new note.SaveSuccess({
          type: 'update'
        })
    );

  @Effect()
  delete$: Observable<Action> = this.actions$
    .ofType<note.Delete>(note.DELETE)
    .map(action => action.payload)
    .switchMap(id => this.notesService.deleteNote(id))
    .map(
      () =>
        new note.SaveSuccess({
          type: 'delete'
        })
    );
}
