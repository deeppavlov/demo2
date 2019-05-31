import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { reducer } from './lib/store';
import saga from './lib/store/saga';
import App from './components/App';
import './index.css';

const middleware = createSagaMiddleware();

const store = createStore(
  reducer,
  applyMiddleware(middleware),
);

middleware.run(saga);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
