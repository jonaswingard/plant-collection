import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromPlants from './plants';
import * as fromCollection from './collection';
import * as fromRoot from '../../store/reducers';

export interface PlantsState {
  plants: fromPlants.State;
  collection: fromCollection.State;
}

export const reducers = {
  plants: fromPlants.reducer,
  collection: fromCollection.reducer
};

export const getPlantsState = createFeatureSelector<PlantsState>('plants');
export const getPlantEntitiesState = createSelector(
  getPlantsState,
  state => state.plants
);

export const getSelectedPlantId = createSelector(
  getPlantEntitiesState,
  fromPlants.getSelectedId
);

export const {
  selectIds: getPlantIds,
  selectEntities: getPlantEntities,
  selectAll: getAllPlants,
  selectTotal: getTotalPlants
} = fromPlants.adapter.getSelectors(getPlantEntitiesState);

export const getSelectedPlant = createSelector(
  getPlantEntities,
  getSelectedPlantId,
  (entities, selectedId: string) => {
    return selectedId && entities[selectedId];
  }
);

export const getCollectionState = createSelector(
  getPlantsState,
  (state: PlantsState) => state.collection
);

export const getCollectionLoaded = createSelector(
  getCollectionState,
  fromCollection.getLoaded
);
export const getCollectionLoading = createSelector(
  getCollectionState,
  fromCollection.getLoading
);
export const getCollectionPlantIds = createSelector(
  getCollectionState,
  fromCollection.getIds
);

export const getPlantCollection = createSelector(
  getPlantEntities,
  getCollectionPlantIds,
  (entities, ids) => {
    return ids.map(id => entities[id]);
  }
);

export const isSelectedPlantInCollection = createSelector(
  getCollectionPlantIds,
  getSelectedPlantId,
  (ids, selected: string) => {
    return ids.indexOf(selected) > -1;
  }
);
