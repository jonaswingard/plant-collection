import { Action } from '@ngrx/store';
import { Activity } from '../../models/activity';

export const LOAD = '[Activity] Load Items';
export const LOAD_SUCCESS = '[Activity] Load Items Success';
export const SELECT = '[Activity] Select';
export const ADD = '[Activity] Add';
export const UPDATE = '[Activity] Update';
export const DELETE = '[Activity] Delete';
export const SAVE_SUCCESS = '[Activity] Save Success';

export class Load implements Action {
  readonly type = LOAD;
  constructor(public payload: string) {}
}

export class LoadSuccess implements Action {
  readonly type = LOAD_SUCCESS;
  constructor(public payload: Activity[]) {}
}

export class Select implements Action {
  readonly type = SELECT;
  constructor(public payload: string) {}
}

export class Add implements Action {
  readonly type = ADD;
  constructor(public payload: Activity) {}
}

export class Update implements Action {
  readonly type = UPDATE;
  constructor(public payload: Activity) {}
}

export class Delete implements Action {
  readonly type = DELETE;
  constructor(public payload: Activity) {}
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
