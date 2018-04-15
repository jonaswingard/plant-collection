import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromRoot from '../../store/reducers';
import * as fromCollection from './collection';
import * as fromPlants from './plants';
import * as fromNotes from './notes';
import * as fromActivities from './activities';
import { Plant } from '../../models/plant';
import { Note } from '../../models/note';
import { Activity } from '../../models/activity';

export interface PlantsState {
  collection: fromCollection.State;
  plants: fromPlants.State;
  notes: fromNotes.State;
  activities: fromActivities.State;
}

export const reducers = {
  collection: fromCollection.reducer,
  plants: fromPlants.reducer,
  notes: fromNotes.reducer,
  activities: fromActivities.reducer
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
  getAllPlants,
  entities => entities
);

export const isSelectedPlantInCollection = createSelector(
  getCollectionPlantIds,
  getSelectedPlantId,
  (ids, selected: string) => {
    return ids.indexOf(selected) > -1;
  }
);

export const getNextPlant = createSelector(
  getSelectedPlantId,
  getPlantCollection,
  (selectedPlantId, entities) => {
    const index = entities.findIndex((p: Plant) => p._id === selectedPlantId);
    if (entities.length > index) {
      return entities[index + 1];
    } else {
      return entities[0];
    }
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
export const getSelectedNoteId = createSelector(
  getNoteEntitiesState,
  fromNotes.getSelectedId
);
export const getNotes = createSelector(
  getSelectedPlantId,
  getAllNotes,
  (plantId, notes) => notes.filter(n => n.plant_id === plantId)
);
export const getSelectedNote = createSelector(
  getNoteEntities,
  getSelectedNoteId,
  (entities, selectedId: string) => {
    return (selectedId && entities[selectedId]) || <Note>{};
  }
);

/* Activities */
export const getActivityEntitiesState = createSelector(
  getPlantsState,
  state => state.activities
);
export const {
  selectEntities: getActivityEntities,
  selectAll: getAllActivities
} = fromActivities.adapter.getSelectors(getActivityEntitiesState);
export const getSelectedActivityId = createSelector(
  getActivityEntitiesState,
  fromActivities.getSelectedId
);
export const getActivites = createSelector(
  getSelectedPlantId,
  getAllActivities,
  (plantId, activites) => activites.filter(n => n.plant_id === plantId)
);
export const getSelectedActivity = createSelector(
  getActivityEntities,
  getSelectedActivityId,
  (entities, selectedId: string) => {
    return (selectedId && entities[selectedId]) || <Activity>{};
  }
);
