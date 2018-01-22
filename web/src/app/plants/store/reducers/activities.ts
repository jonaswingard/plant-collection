import { createSelector } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import * as activity from '../actions/activity';
import { Activity } from '../../models/activity';

export interface State extends EntityState<Activity> {
  selectedActivityId: string | null;
}

export const adapter: EntityAdapter<Activity> = createEntityAdapter<Activity>({
  selectId: activity => activity._id,
  sortComparer: false
});

export const initialState: State = adapter.getInitialState({
  selectedActivityId: null
});

export function reducer(state = initialState, action: activity.Actions): State {
  switch (action.type) {
    case activity.LOAD_SUCCESS: {
      return {
        ...adapter.addMany(action.payload, state),
        selectedActivityId: state.selectedActivityId
      };
    }

    case activity.SAVE_SUCCESS: {
      if (action.payload.type === 'add') {
        return {
          ...adapter.addOne(action.payload.item, state)
        };
      }
    }

    case activity.SELECT: {
      return {
        ...state,
        selectedActivityId: action.payload
      };
    }

    case activity.UPDATE: {
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

    case activity.DELETE: {
      return {
        ...adapter.removeOne(action.payload._id, state),
        selectedActivityId: initialState.selectedActivityId
      };
    }

    default: {
      return state;
    }
  }
}

export const getSelectedId = (state: State) => state.selectedActivityId;
