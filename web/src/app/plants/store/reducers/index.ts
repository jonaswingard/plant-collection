import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromPlants from './plants';
import * as fromNotes from './notes';
import * as fromCollection from './collection';
import * as fromRoot from '../../store/reducers';
import { Plant } from '../../models/plant';

export interface PlantsState {
  plants: fromPlants.State;
  notes: fromNotes.State;
  collection: fromCollection.State;
}

export const reducers = {
  plants: fromPlants.reducer,
  notes: fromNotes.reducer,
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
    return (selectedId && entities[selectedId]) || <Plant>{};
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

/* Notes */
export const getNoteEntitiesState = createSelector(
  getPlantsState,
  state => state.notes
);
export const {
  selectEntities: getNoteEntities,
  selectAll: getAllNotes
} = fromNotes.adapter.getSelectors(getNoteEntitiesState);

export const getNotes = createSelector(
  getSelectedPlantId,
  getAllNotes,
  (plantId, notes) => notes.filter(n => n.plant_id === plantId)
);
