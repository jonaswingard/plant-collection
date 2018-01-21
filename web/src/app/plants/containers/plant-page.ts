import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromPlants from '../store/reducers';
import * as collection from '../store/actions/collection';
import * as plant from '../store/actions/plant';
import * as note from '../store/actions/note';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import { Subscription } from 'rxjs/Subscription';
import { Plant } from '../models/plant';
import { Note } from '../models/note';

@Component({
  selector: 'pc-collection-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h1>Plant Page</h1>
    <a [routerLink]="['../']">Tillbaka</a>
    <div class="row">
      <div class="column">
        <h2>Plant Edit</h2>
        <pc-plant-edit [plant]="plant$ | async" (onSubmit)="upsert($event)" (onDelete)="delete($event)"></pc-plant-edit>
      </div>
      <div class="column">
        <h2>Notes</h2>
        <pc-note-list [notes]="notes$ | async" (onAction)="handleNote($event)"></pc-note-list>
        <pc-note-edit [plant]="plant$ | async" [note]="note$ | async" (onSubmit)="upsertNote($event)"></pc-note-edit>
      </div>
    </div>
  `,
  styles: [
    `
    .row {
      width: 1000px;
      margin: 0 auto;
      display: flex;
    }
    .column {
      width: 50%;
    }
  `
  ]
})
export class PlantPageComponent implements OnDestroy {
  actionsSubscription: Subscription;
  plant$: Observable<Plant>;
  notes$: Observable<Note[]>;
  note$: Observable<Note>;

  constructor(
    private route: ActivatedRoute,
    router: Router,
    private store: Store<fromPlants.PlantsState>
  ) {
    this.actionsSubscription = this.route.params
      .filter(p => p.id && p.id !== 'add')
      .map(params => new plant.Select(params.id))
      .subscribe(store);

    this.plant$ = store.select(fromPlants.getSelectedPlant);
    this.notes$ = store.select(fromPlants.getNotes);
    this.note$ = store.select(fromPlants.getSelectedNote);
  }

  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
  }

  upsert(plantItem: Plant) {
    this.store.dispatch(
      plantItem._id
        ? new plant.Update(plantItem)
        : delete plantItem._id && new plant.Add(plantItem)
    );
  }

  delete(id: string) {
    confirm('Are you soure?') && this.store.dispatch(new plant.Delete(id));
  }

  upsertNote(noteItem: Note) {
    this.store.dispatch(
      noteItem._id
        ? new note.Update(noteItem)
        : delete noteItem._id && new note.Add(noteItem)
    );
  }

  handleNote([type, item]: [string, Note]) {
    if (type === 'delete') {
      this.store.dispatch(new note.Delete(item));
    } else if (type === 'select') {
      this.store.dispatch(new note.Select(item._id));
    }
  }
}
