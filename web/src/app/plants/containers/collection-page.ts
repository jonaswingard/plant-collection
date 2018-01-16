import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromPlants from '../store/reducers';
import * as collection from '../store/actions/collection';
import { Plant } from '../models/plant';

@Component({
  selector: 'pc-collection-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h1>CollectionPage</h1>
    <h2>Plants</h2>
    <pc-plant-list [plants]="plants$ | async"></pc-plant-list>
  `
})
export class CollectionPageComponent {
  plants$: Observable<Plant[]>;

  constructor(private store: Store<fromPlants.PlantsState>) {
    this.plants$ = store.select(fromPlants.getPlantCollection);
  }

  ngOnInit() {
    this.store.dispatch(new collection.Load());
  }
}
