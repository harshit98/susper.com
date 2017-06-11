import { Action } from '@ngrx/store';
import { type } from '../utils';
export const ActionTypes = {
    CHANGE: type('[News] Search'),
};
export class NewsAction implements Action {
    type = ActionTypes.CHANGE;
    constructor(public payload: any) { }
}

export type Actions
    = NewsAction;
