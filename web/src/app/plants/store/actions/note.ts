import { Action } from '@ngrx/store';
import { Note } from '../../models/note';

export const LOAD = '[Note] Load';
export const LOAD_SUCCESS = '[Note] Load Success';
export const SELECT = '[Note] Select';
export const ADD = '[Note] Add';
export const UPDATE = '[Note] Update';
export const DELETE = '[Note] Delete';
export const SAVE_SUCCESS = '[Note] Save Success';

export class Load implements Action {
  readonly type = LOAD;
  constructor(public payload: string) {}
}

export class LoadSuccess implements Action {
  readonly type = LOAD_SUCCESS;
  constructor(public payload: Note[]) {}
}

export class Select implements Action {
  readonly type = SELECT;
  constructor(public payload: string) {}
}

export class Add implements Action {
  readonly type = ADD;
  constructor(public payload: Note) {}
}

export class Update implements Action {
  readonly type = UPDATE;
  constructor(public payload: Note) {}
}

export class Delete implements Action {
  readonly type = DELETE;
  constructor(public payload: Note) {}
}

export class SaveSuccess implements Action {
  readonly type = SAVE_SUCCESS;
  constructor(public payload: any) {}
}

export type Actions =
  | Load
  | LoadSuccess
  | Select
  | Add
  | Update
  | Delete
  | SaveSuccess;
