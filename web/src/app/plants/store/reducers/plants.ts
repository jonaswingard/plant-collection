import { createSelector } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import * as plant from '../actions/plant';
import * as collection from '../actions/collection';
import { Plant } from '../../models/plant';

export interface State extends EntityState<Plant> {
  selectedPlantId: string | null;
}

export const adapter: EntityAdapter<Plant> = createEntityAdapter<Plant>({
  selectId: plant => plant._id,
  sortComparer: false
});

export const initialState: State = adapter.getInitialState({
  selectedPlantId: null
});

export function reducer(
  state = initialState,
  action: plant.Actions | collection.Actions
): State {
  switch (action.type) {
    case collection.LOAD_SUCCESS: {
      return {
        ...adapter.addMany(action.payload, state),
        selectedPlantId: state.selectedPlantId
      };
    }

    case plant.LOAD: {
      return {
        ...adapter.addOne(action.payload, state),
        selectedPlantId: state.selectedPlantId
      };
    }

    case plant.SELECT: {
      return {
        ...state,
        selectedPlantId: action.payload
      };
    }

    case plant.ADD: {
      return {
        ...adapter.addOne(action.payload, state)
      };
    }

    case plant.UPDATE: {
      return {
        ...adapter.updateOne(
          {
            id: action.payload._id,
            changes: action.payload
          },
          state
        )
      };
    }

    case plant.DELETE: {
      return {
        ...adapter.removeOne(action.payload, state)
      };
    }

    default: {
      return state;
    }
  }
}

export const getSelectedId = (state: State) => state.selectedPlantId;
