import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { Provider } from "react-redux";

import combinedReducers from "./rootReducers";
import rootSaga from "./rootSagas";

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// dev tools middleware
const composeEnhancers = process.env.NODE_ENV === 'production'
  ? compose
  : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// create a redux store with our reducer above and middleware
const store = createStore(
  combinedReducers,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

// run saga
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
