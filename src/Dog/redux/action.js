import { takeLatest, call, put } from 'redux-saga/effects';

import {
  API_CALL_REQUEST,
  API_CALL_SUCCESS,
  API_CALL_FAILURE,
} from './reducer';

import axios from 'axios';

export default function* watcherSaga() {
  yield takeLatest(API_CALL_REQUEST, workerSaga);
}

// function that makes the api request and returns a Promise for response
const fetchDog = () => {
  return axios({
    method: 'get',
    url: "https://dog.ceo/api/breeds/image/random",
  })
}

// worker saga: makes the api call when watcher saga sees the action
function* workerSaga() {
  try {
    const { data } = yield call(fetchDog);
    const dog = data.message;
    yield put({ type: API_CALL_SUCCESS, dog});
  } catch (err) {
    yield put({ type: API_CALL_FAILURE, err});
  }
}