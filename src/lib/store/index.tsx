import { Action as A } from 'redux';
import { createActions, handleActions } from 'redux-actions';


export type Type = 'LOAD_ANSWER';
export interface Action extends A<Type> {
    payload: {
      [key: string]: any;
    }
}

export interface Store {}

// eslint-disable-next-line
const store: Store = {}
// eslint-disable-next-line
const {} = createActions({})


const reducer = handleActions({

}, store)

export { reducer }