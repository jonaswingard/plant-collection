import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromPlants from '../store/reducers';
import * as collection from '../store/actions/collection';
import * as plant from '../store/actions/plant';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';
import { Subscription } from 'rxjs/Subscription';
import { Plant } from '../models/plant';

@Component({
  selector: 'pc-collection-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h1>Plant Page</h1>
    <pc-plant-edit [plant]="plant$ | async" (onUpdate)="update($event)"></pc-plant-edit>
  `
})
export class PlantPageComponent implements OnDestroy {
  actionsSubscription: Subscription;
  plant$: Observable<Plant>;

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromPlants.PlantsState>
  ) {
    this.actionsSubscription = this.route.params
      .filter(p => p.id)
      .map(params => new plant.Select(params.id))
      .subscribe(store);

    this.plant$ = store.select(fromPlants.getSelectedPlant);
  }

  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
  }

  update(plant: Plant) {
    console.log(plant);
  }
}
