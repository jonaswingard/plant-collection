import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toArray';
import 'rxjs/add/operator/do';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { defer } from 'rxjs/observable/defer';
import { of } from 'rxjs/observable/of';

import * as plant from '../actions/plant';
import * as note from '../actions/note';
import * as activity from '../actions/activity';
import { PlantsService } from '../../services/plants.service';
import { Plant } from '../../models/plant';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable()
export class PlantEffects {
  constructor(
    private actions$: Actions,
    private plantsService: PlantsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  @Effect()
  add$: Observable<Action> = this.actions$
    .ofType<plant.Add>(plant.ADD)
    .map(action => action.payload)
    .switchMap(item =>
      this.plantsService.addPlant(item).map(data => new plant.AddSuccess(data))
    )
    .map(action => new plant.SaveSuccess(['plants', action.payload._id]));

  @Effect()
  update$: Observable<Action> = this.actions$
    .ofType<plant.Update>(plant.UPDATE)
    .map(action => action.payload)
    .switchMap(item =>
      this.plantsService.updatePlant(item).map(() => new plant.SaveSuccess([]))
    );

  @Effect()
  delete$: Observable<Action> = this.actions$
    .ofType<plant.Delete>(plant.DELETE)
    .map(action => action.payload)
    .switchMap(id =>
      this.plantsService
        .deletePlant(id)
        .map(() => new plant.SaveSuccess(['../']))
    );

  @Effect({ dispatch: false })
  saveSuccess$: Observable<any> = this.actions$
    .ofType<plant.SaveSuccess>(plant.SAVE_SUCCESS)
    .map(action => action.payload)
    .do(
      redirectTo =>
        redirectTo.length &&
        this.router.navigate(redirectTo, { relativeTo: this.route })
    );

  @Effect()
  select$: Observable<any> = this.actions$
    .ofType<plant.Select>(plant.SELECT)
    .map(action => action.payload)
    .mergeMap(plantId => [new note.Load(plantId), new activity.Load(plantId)]);

  @Effect()
  uploadImage$: Observable<any> = this.actions$
    .ofType<plant.UploadImage>(plant.UPLOAD_IMAGE)
    .map(action => action.payload)
    .switchMap(([plantItem, file]) =>
      this.plantsService.uploadImage(plantItem._id, file).map(
        data =>
          <Plant>{
            ...plantItem,
            image_url: data.url
          }
      )
    )
    .map(updatedPlant => new plant.Update(updatedPlant));
}
