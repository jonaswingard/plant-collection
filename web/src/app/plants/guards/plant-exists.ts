import 'rxjs/add/operator/take';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/let';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import * as fromPlants from '../store/reducers';
import * as plant from '../store/actions/plant';
import { PlantsService } from '../services/plants.service';

@Injectable()
export class PlantExistsGuard implements CanActivate {
  constructor(
    private plantsService: PlantsService,
    private store: Store<fromPlants.PlantsState>,
    private router: Router
  ) {}

  hasPlantInStore(id: string): Observable<boolean> {
    return this.store
      .select(fromPlants.getPlantEntities)
      .map(entities => !!entities[id])
      .take(1);
  }

  hasPlantInApi(id: string): Observable<boolean> {
    return this.plantsService
      .getPlant(id)
      .map(plantEntity => new plant.Load(plantEntity))
      .do((action: plant.Load) => this.store.dispatch(action))
      .map(plant => !!plant)
      .catch(() => {
        this.router.navigate(['/404']);
        return of(false);
      });
  }

  hasPlant(id: string): Observable<boolean> {
    return this.hasPlantInStore(id).switchMap(
      inStore => (inStore ? of(inStore) : this.hasPlantInApi(id))
    );
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.hasPlant(route.params['id']);
  }
}