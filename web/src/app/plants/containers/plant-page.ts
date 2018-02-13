import * as activity from '../store/actions/activity';
import * as collection from '../store/actions/collection';
import * as fromPlants from '../store/reducers';
import * as note from '../store/actions/note';
import * as plant from '../store/actions/plant';

import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';

import { Activity } from '../models/activity';
import { Note } from '../models/note';
import { Observable } from 'rxjs/Observable';
import { Plant } from '../models/plant';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'pc-collection-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="row">
      <div class="column">
        <h1>Plant Page</h1>
        <a [routerLink]="['../']" title="Back to start...">
          <mat-icon>arrow_back</mat-icon>
        </a>
      </div>
    </div>
    <div class="row">
      <div class="column">
        <pc-plant-view *ngIf="!edit" [plant]="plant$ | async" (onEdit)="edit = !edit" (onAddActivity)="addActivity($event)"></pc-plant-view>
        <pc-plant-edit *ngIf="edit" [plant]="plant$ | async" (onSubmit)="upsert($event); edit = !edit" (onDelete)="delete($event)"></pc-plant-edit>
        <pc-upload-image *ngIf="edit" [plant]="plant$ | async" (onFileChange)="onPlantImageUload($event)" ></pc-upload-image>
      </div>
      <div class="column">
        <mat-card>
          <mat-card-header>
            <mat-card-title>Activities</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <pc-activity-list [activities]="activities$ | async" (onDelete)="deleteActivity($event)"></pc-activity-list>
            <pc-activity *ngIf="showAddActivity" [plant]="plant$ | async" (onAdd)="addActivity($event)"></pc-activity>
          </mat-card-content>
        </mat-card>
        <mat-divider></mat-divider>
        <mat-card>
          <mat-card-header>
            <mat-card-title>Notes</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <pc-note-list [notes]="notes$ | async" (onAction)="handleNote($event)"></pc-note-list>
            <pc-note-edit [plant]="plant$ | async" [note]="note$ | async" (onSubmit)="upsertNote($event)"></pc-note-edit>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [
    `
    mat-divider {
      margin: 20px 0;
    }
  `
  ]
})
export class PlantPageComponent implements OnDestroy {
  actionsSubscription: Subscription;
  plant$: Observable<Plant>;
  notes$: Observable<Note[]>;
  note$: Observable<Note>;
  activities$: Observable<Activity[]>;
  edit: boolean;
  showAddActivity = false;

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
    this.activities$ = store.select(fromPlants.getActivites);
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

  addActivity(activityItem: Activity) {
    this.store.dispatch(new activity.Add(activityItem));
  }

  deleteActivity(activityItem: Activity) {
    this.store.dispatch(new activity.Delete(activityItem));
  }

  onPlantImageUload([plantItem, file]) {
    this.store.dispatch(new plant.UploadImage([plantItem, file]));
  }
}
