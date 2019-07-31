import { createActions, handleActions } from 'redux-actions';
export interface Action<T = { [key:string]: any; }> {
  type: string;
  payload: T;
}
export interface State {
  loading?: boolean;
  [key:string]: any;
}
interface UpdateAction {
  prop: string;
  messages: any[];
}
interface SafeStateAction {
  prop: string;
  componentState: any;
}
interface Actions {
  updatestore: (prop: string, messages: any[]) => Action<UpdateAction>;
  loading: () => Action<{}>;
  safecomponentinputs: (prop: string, componentState: any) => Action<SafeStateAction>;
}

const state: State = {
  loading: false,
};

const { updatestore, loading, safecomponentinputs }: Actions = createActions({
  UPDATESTORE: (prop: string, messages: any[]) => ({ prop, messages }),
  LOADING: () => ({}),
  SAFECOMPONENTINPUTS: (prop: string, componentState: any) => ({ prop, componentState }),
});

const reducer = handleActions({
  UPDATESTORE: (state: State, action: Action<UpdateAction>) => {
    const { prop, messages } = action.payload;
    return { ...state, [prop]: [...messages] };
  },
  LOADING: (state: State) => {
    return { ...state, loading: !state.loading };
  },
  SAFECOMPONENTINPUTS: (state: State, action: Action<SafeStateAction>) => {
    const { prop, componentState } = action.payload;
    return { ...state, [prop]: { ...componentState } };
  },
}, state);

export { reducer, updatestore, loading, safecomponentinputs as SCI };
