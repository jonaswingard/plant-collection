import { createSelector } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import * as note from '../actions/note';
import { Note } from '../../models/note';

export interface State extends EntityState<Note> {
  selectedNoteId: string | null;
}

export const adapter: EntityAdapter<Note> = createEntityAdapter<Note>({
  selectId: note => note._id,
  sortComparer: false
});

export const initialState: State = adapter.getInitialState({
  selectedNoteId: null
});

export function reducer(state = initialState, action: note.Actions): State {
  switch (action.type) {
    case note.LOAD_SUCCESS: {
      return {
        ...adapter.addMany(action.payload, state),
        selectedNoteId: state.selectedNoteId
      };
    }

    case note.SAVE_SUCCESS: {
      if (action.payload.type === 'add') {
        return {
          ...adapter.addOne(action.payload.item, state)
        };
      }
    }

    case note.SELECT: {
      return {
        ...state,
        selectedNoteId: action.payload
      };
    }

    case note.UPDATE: {
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

    case note.DELETE: {
      return {
        ...adapter.removeOne(action.payload._id, state),
        selectedNoteId: initialState.selectedNoteId
      };
    }

    default: {
      return state;
    }
  }
}

export const getSelectedId = (state: State) => state.selectedNoteId;
