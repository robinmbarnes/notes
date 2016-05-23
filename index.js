import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createLogger from 'redux-logger';
import App from 'containers/app';
import noteApp from 'reducers';
import 'styles/global.css';
import 'babel-polyfill';
import 'babel-regenerator-runtime';
import 'babel-core/register';
import { requestNotes } from 'actions';
import createSagaMiddleware from 'redux-saga';
import sagas from 'sagas';

const logger = createLogger();
const sagaMiddleware = createSagaMiddleware()
const createStoreWithMiddleware = compose(
  applyMiddleware(sagaMiddleware, thunk, promise, logger),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);
const store = createStoreWithMiddleware(noteApp);
sagaMiddleware.run(sagas);

let rootElement = document.getElementById('root');
render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);

store.dispatch(requestNotes());
