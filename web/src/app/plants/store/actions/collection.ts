import { Action } from '@ngrx/store';
import { Plant } from '../../models/plant';

export const LOAD = '[Collection] Load';
export const LOAD_SUCCESS = '[Collection] Load Success';
export const LOAD_FAIL = '[Collection] Load Fail';

/**
 * Load Collection Actions
 */
export class Load implements Action {
  readonly type = LOAD;
}

export class LoadSuccess implements Action {
  readonly type = LOAD_SUCCESS;
  constructor(public payload: Plant[]) {}
}

export class LoadFail implements Action {
  readonly type = LOAD_FAIL;
  constructor(public payload: Plant) {}
}

export type Actions = Load | LoadSuccess | LoadFail;
