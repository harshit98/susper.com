import { compose } from '@ngrx/core';
import { combineReducers } from '@ngrx/store';
import { ActionReducer, Action } from '@ngrx/store';
import { createSelector } from 'reselect';
import * as news from '../actions/news';
export const CHANGE = 'CHANGE';
export interface State {
    news: any;
}
/**
 * There is always a need of initial state to be passed onto the store.
 *
 * @prop: query: ''
 * @prop: loading: false
 */
const initialState: State = {
    news: {}
};
export function reducer(state: State = initialState, action: news.Actions): State {
    switch (action.type) {
        case news.ActionTypes.CHANGE: {
            const response = action.payload;
            return Object.assign({}, state, {
                news: news,
            });
        }
        default: {
            return state;
        }
    }
}
export const getNews = (state: State) => state.news;
