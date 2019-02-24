import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { Provider } from "react-redux";

import combinedReducers from "./reducer";
import { watcherSaga } from "./sagas";

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// dev tools middleware
const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

// create a redux store with our reducer above and middleware
const store = createStore(
  combinedReducers,
  compose(applyMiddleware(sagaMiddleware), reduxDevTools)
);

// run saga
sagaMiddleware.run(watcherSaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
