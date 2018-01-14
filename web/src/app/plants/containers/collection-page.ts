import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromPlants from '../store/reducers';
import * as collection from '../store/actions/collection';

@Component({
  selector: 'pc-collection-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h1>CollectionPage</h1>
    <h2>Plants</h2>
    <ul>
      <li *ngFor="let plant of (plants$ | async)">
        {{ plant.name }}
      </li>
    </ul>
  `
})
export class CollectionPageComponent {
  plants$: Observable<any[]>;

  constructor(private store: Store<fromPlants.PlantsState>) {
    this.plants$ = store.select(fromPlants.getPlantCollection);
  }

  ngOnInit() {
    this.store.dispatch(new collection.Load());
  }
}
