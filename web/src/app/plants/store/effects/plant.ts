import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/toArray";
import "rxjs/add/operator/do";
import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Effect, Actions } from "@ngrx/effects";
import { Observable } from "rxjs/Observable";
import { defer } from "rxjs/observable/defer";
import { of } from "rxjs/observable/of";

import * as plant from "../actions/plant";
import { PlantsService } from "../../services/plants.service";
import { Plant } from "../../models/plant";

@Injectable()
export class PlantEffects {
  constructor(
    private actions$: Actions,
    private plantsService: PlantsService
  ) {}

  @Effect()
  add$: Observable<Action> = this.actions$
    .ofType<plant.Add>(plant.ADD)
    .map(action => action.payload)
    .switchMap(item =>
      this.plantsService.addPlant(item).map(() => new plant.SaveSuccess())
    );

  @Effect()
  update$: Observable<Action> = this.actions$
    .ofType<plant.Update>(plant.UPDATE)
    .map(action => action.payload)
    .switchMap(item =>
      this.plantsService.updatePlant(item).map(() => new plant.SaveSuccess())
    );

  @Effect()
  delete$: Observable<Action> = this.actions$
    .ofType<plant.Delete>(plant.DELETE)
    .map(action => action.payload)
    .switchMap(id =>
      this.plantsService.deletePlant(id).map(() => new plant.SaveSuccess())
    );
}
