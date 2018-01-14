import { Action } from '@ngrx/store';

export const LOAD = '[Book] Load';
export const SELECT = '[Book] Select';

export class Load implements Action {
  readonly type = LOAD;
  constructor(public payload: any) {}
}

export class Select implements Action {
  readonly type = SELECT;
  constructor(public payload: string) {}
}

export type Actions = Load | Select;
