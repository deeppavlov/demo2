import { createActions, handleActions } from 'redux-actions';
export interface Action<T = { [key:string]: any; }> {
  type: string;
  payload: T;
}
export interface State {
  [key:string]: any[];
}
interface UpdateAction {
  prop: string;
  messages: any[];
}
interface Actions {
  updatestore: (prop: string, messages: any[]) => Action<UpdateAction>;
}

const state: State = {};

const { updatestore }: Actions = createActions({
  UPDATESTORE: (prop: string, messages: any[]) => ({ prop, messages }),
});

const reducer = handleActions({
  UPDATESTORE: (state: State, action: Action<UpdateAction>) => {
    const { prop, messages } = action.payload;
    return { ...state, [prop]: [...messages] };
  },
}, state);

export { reducer, updatestore };
