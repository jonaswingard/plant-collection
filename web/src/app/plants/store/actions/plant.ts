import { Action } from '@ngrx/store';
import { Plant } from '../../models/plant';

export const LOAD = '[Plant] Load';
export const SELECT = '[Plant] Select';

export class Load implements Action {
  readonly type = LOAD;
  constructor(public payload: Plant) {}
}

export class Select implements Action {
  readonly type = SELECT;
  constructor(public payload: string) {}
}

export type Actions = Load | Select;
