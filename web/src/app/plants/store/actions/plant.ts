import { Action } from '@ngrx/store';
import { Plant } from '../../models/plant';

export const LOAD = '[Plant] Load';
export const SELECT = '[Plant] Select';
export const ADD = '[Plant] Add';
export const ADD_SUCCESS = '[Plant] Add Success';
export const UPDATE = '[Plant] Update';
export const DELETE = '[Plant] Delete';
export const SAVE_SUCCESS = '[Plant] Save Success';
export const UPLOAD_IMAGE = '[Plant] Upload Image';

export class Load implements Action {
  readonly type = LOAD;
  constructor(public payload: Plant) {}
}

export class Select implements Action {
  readonly type = SELECT;
  constructor(public payload: string) {}
}

export class Add implements Action {
  readonly type = ADD;
  constructor(public payload: Plant) {}
}

export class AddSuccess implements Action {
  readonly type = ADD_SUCCESS;
  constructor(public payload: Plant) {}
}

export class Update implements Action {
  readonly type = UPDATE;
  constructor(public payload: Plant) {}
}

export class Delete implements Action {
  readonly type = DELETE;
  constructor(public payload: string) {}
}

export class SaveSuccess implements Action {
  readonly type = SAVE_SUCCESS;
  constructor(public payload: string[]) {}
}

export class UploadImage implements Action {
  readonly type = UPLOAD_IMAGE;
  constructor(public payload: any[]) {}
}

export type Actions =
  | Load
  | Select
  | Add
  | Update
  | Delete
  | SaveSuccess
  | UploadImage
  | AddSuccess;
