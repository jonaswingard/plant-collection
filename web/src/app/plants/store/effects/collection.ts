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

import * as collection from '../actions/collection';
import { PlantsService } from '../../services/plants.service';
import { Plant } from '../../models/plant';

@Injectable()
export class CollectionEffects {
  constructor(
    private actions$: Actions,
    private plantsService: PlantsService
  ) {}

  @Effect()
  loadCollection$: Observable<Action> = this.actions$
    .ofType(collection.LOAD)
    .switchMap(() =>
      this.plantsService
        .getPlants()
        .map((plants: Plant[]) => new collection.LoadSuccess(plants))
        .catch(error => of(new collection.LoadFail(error)))
    );
}
