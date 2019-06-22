import { all } from 'redux-saga/effects';

import watcherSagaDog from './Dog/redux/action';

export default function* rootSaga() {
  yield all([
    watcherSagaDog()
  ])
}